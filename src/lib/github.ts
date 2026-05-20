import { DATA } from "@/data/resume";

const USER = DATA.githubUsername;
const REVALIDATE = 60 * 60 * 6;

export type GithubUser = {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  topics?: string[];
};

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type ContributionsResponse = {
  total: Record<string, number>;
  contributions: ContributionDay[];
};

export type GithubSummary = {
  user: GithubUser;
  repos: GithubRepo[];
  topRepos: GithubRepo[];
  stars: number;
  contributions: ContributionsResponse | null;
};

async function ghFetch<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE },
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getGithubSummary(): Promise<GithubSummary | null> {
  const [user, reposRaw, contributions] = await Promise.all([
    ghFetch<GithubUser>(`https://api.github.com/users/${USER}`),
    ghFetch<GithubRepo[]>(
      `https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`,
    ),
    ghFetch<ContributionsResponse>(
      `https://github-contributions-api.jogruber.de/v4/${USER}?y=last`,
    ),
  ]);

  if (!user) return null;

  const repos = (reposRaw ?? []).filter((r) => !r.fork && !r.archived);
  const topRepos = [...repos]
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count ||
        new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
    )
    .slice(0, 6);
  const stars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  return { user, repos, topRepos, stars, contributions };
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Rust: "#dea584",
  Vue: "#41b883",
  PHP: "#4F5D95",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Dart: "#00B4AB",
  Python: "#3572A5",
  Go: "#00ADD8",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
};
