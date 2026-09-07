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
  filePath: 'data/site_config.json'
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
  const filePath = (config.filePath || 'data/site_config.json').trim();
  const token = config.personalAccessToken.trim();

  const targetUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;

  let existingSha: string | undefined = undefined;

  // 1. Fetch current file SHA if file already exists in repository
  try {
    const getRes = await fetch(targetUrl, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (getRes.ok) {
      const fileData = await getRes.json();
      existingSha = fileData.sha;
    }
  } catch (e) {
    console.warn('File check warning before commit:', e);
  }

  // 2. Format JSON content and encode UTF-8 Base64
  const jsonContent = JSON.stringify(globalStore, null, 2);
  const base64Content = utf8ToBase64(jsonContent);

  const commitMessage = customCommitMsg || `cms: update ${filePath} from TikSave Pro Admin Panel [${new Date().toISOString()}]`;

  const payload: any = {
    message: commitMessage,
    content: base64Content,
    branch
  };

  if (existingSha) {
    payload.sha = existingSha;
  }

  // 3. Issue PUT request to commit file to GitHub
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

      // Log last commit to localStorage
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
