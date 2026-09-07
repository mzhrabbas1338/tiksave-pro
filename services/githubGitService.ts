import { WordPressGlobalStore } from './cloudSyncService';

export interface GitHubConfig {
  owner: string;
  repo: string;
  branch: string;
  personalAccessToken: string;
  filePath: string;
}

export const DEFAULT_GITHUB_CONFIG: GitHubConfig = {
  owner: '',
  repo: '',
  branch: 'main',
  personalAccessToken: '',
  filePath: 'public/data/site_config.json'
};

const GITHUB_CONFIG_KEY = 'tiksave_github_config';

export const getGitHubConfig = (): GitHubConfig => {
  try {
    const saved = localStorage.getItem(GITHUB_CONFIG_KEY);
    if (saved) {
      return { ...DEFAULT_GITHUB_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to parse GitHub config', e);
  }
  return DEFAULT_GITHUB_CONFIG;
};

export const saveGitHubConfig = (config: GitHubConfig): void => {
  try {
    localStorage.setItem(GITHUB_CONFIG_KEY, JSON.stringify(config));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('tiksave_github_config_updated'));
    }
  } catch (e) {
    console.error('Failed to save GitHub config', e);
  }
};

export interface GitHubTestResult {
  success: boolean;
  message: string;
  user?: string;
  repoDetails?: any;
}

export const testGitHubConnection = async (configOverride?: GitHubConfig): Promise<GitHubTestResult> => {
  const config = configOverride || getGitHubConfig();

  if (!config.owner || !config.repo || !config.personalAccessToken) {
    return {
      success: false,
      message: 'Missing GitHub Repository Credentials (Owner, Repo, or Access Token).'
    };
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${config.owner.trim()}/${config.repo.trim()}`, {
      headers: {
        'Authorization': `Bearer ${config.personalAccessToken.trim()}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        message: `Successfully connected to repository ${data.full_name}! (Default Branch: ${data.default_branch})`,
        repoDetails: data
      };
    } else {
      const errData = await res.json().catch(() => ({}));
      return {
        success: false,
        message: `GitHub API Error (${res.status}): ${errData.message || 'Unauthorized or Repository Not Found'}`
      };
    }
  } catch (e: any) {
    return {
      success: false,
      message: `Network error connecting to GitHub: ${e?.message || e}`
    };
  }
};

export interface CommitResult {
  success: boolean;
  message: string;
  sha?: string;
  commitUrl?: string;
}

// Convert string to base64 safely handling UTF-8 characters (emojis, etc.)
const utf8ToBase64 = (str: string): string => {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_match, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );
};

export const commitToGitHubRepository = async (
  globalStore: WordPressGlobalStore,
  customCommitMsg?: string,
  configOverride?: GitHubConfig
): Promise<CommitResult> => {
  const config = configOverride || getGitHubConfig();

  if (!config.owner || !config.repo || !config.personalAccessToken) {
    return {
      success: false,
      message: 'GitHub auto-deploy not configured (Missing token/repo).'
    };
  }

  const owner = config.owner.trim();
  const repo = config.repo.trim();
  const branch = (config.branch || 'main').trim();
  // Strip any leading slashes e.g. "/public/data/site_config.json" -> "public/data/site_config.json"
  const rawPath = (config.filePath || 'public/data/site_config.json').trim();
  const filePath = rawPath.replace(/^\/+/, '');
  const token = config.personalAccessToken.trim();

  const fetchLatestSha = async (): Promise<string | undefined> => {
    try {
      const getRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}&_t=${Date.now()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        }
      );

      if (getRes.ok) {
        const fileData = await getRes.json();
        if (fileData && fileData.sha) {
          return fileData.sha;
        }
      }
    } catch (e) {
      console.warn('File check warning before commit:', e);
    }

    // Fallback: Query commits endpoint for the file SHA if direct contents call didn't return SHA
    try {
      const commitsRes = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/commits?path=${filePath}&sha=${branch}&per_page=1&_t=${Date.now()}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        }
      );

      if (commitsRes.ok) {
        const commits = await commitsRes.json();
        if (Array.isArray(commits) && commits.length > 0) {
          // Query the tree for that file
          const commitSha = commits[0].sha;
          const treeRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/git/trees/${commitSha}?recursive=1`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
              }
            }
          );
          if (treeRes.ok) {
            const treeData = await treeRes.json();
            const fileItem = treeData.tree?.find((item: any) => item.path === filePath);
            if (fileItem?.sha) {
              return fileItem.sha;
            }
          }
        }
      }
    } catch (e) {}

    return undefined;
  };

  const jsonContent = JSON.stringify(globalStore, null, 2);
  const base64Content = utf8ToBase64(jsonContent);
  const commitMessage = customCommitMsg || `cms: update ${filePath} from TikSave Pro Admin Panel [${new Date().toISOString()}]`;

  // Attempt commit with automatic SHA recovery on 409 or 422
  const attemptCommit = async (sha?: string, isRetry: boolean = false): Promise<CommitResult> => {
    const payload: any = {
      message: commitMessage,
      content: base64Content,
      branch
    };

    if (sha) {
      payload.sha = sha;
    }

    try {
      const putRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(payload)
      });

      if (putRes.ok) {
        const resData = await putRes.json();
        const commitSha = resData.commit?.sha?.substring(0, 7) || 'latest';
        const commitHtmlUrl = resData.commit?.html_url || `https://github.com/${owner}/${repo}`;
        
        console.log(`✅ Git commit successful (${commitSha})! Triggering Vercel deployment...`);

        try {
          localStorage.setItem('tiksave_last_git_commit', JSON.stringify({
            sha: commitSha,
            url: commitHtmlUrl,
            time: Date.now(),
            message: commitMessage
          }));
        } catch (e) {}

        return {
          success: true,
          message: `Committed cleanly to Git (${commitSha})! Vercel Deployment Triggered!`,
          sha: commitSha,
          commitUrl: commitHtmlUrl
        };
      } else if ((putRes.status === 409 || putRes.status === 422) && !isRetry) {
        // Handle 409 Conflict or 422 ("sha" wasn't supplied) by fetching fresh SHA and retrying once
        console.warn(`GitHub API ${putRes.status} returned - fetching fresh file SHA and retrying commit...`);
        const freshSha = await fetchLatestSha();
        if (freshSha) {
          return await attemptCommit(freshSha, true);
        }
        const errData = await putRes.json().catch(() => ({}));
        return {
          success: false,
          message: `GitHub Commit Error (${putRes.status}): ${errData.message || 'SHA missing or conflict'}`
        };
      } else {
        const errData = await putRes.json().catch(() => ({}));
        return {
          success: false,
          message: `GitHub Commit Error (${putRes.status}): ${errData.message || 'Permission denied'}`
        };
      }
    } catch (e: any) {
      return {
        success: false,
        message: `Failed to commit to GitHub: ${e?.message || e}`
      };
    }
  };

  const initialSha = await fetchLatestSha();
  return await attemptCommit(initialSha);
};
