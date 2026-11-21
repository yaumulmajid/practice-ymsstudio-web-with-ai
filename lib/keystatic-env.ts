// Is the CMS usable in this environment? Local mode needs nothing; GitHub mode
// (production) needs the GitHub App credentials — see docs/CMS.md.
export const keystaticGithubMode =
  process.env.NODE_ENV !== "development" || process.env.NEXT_PUBLIC_KEYSTATIC_MODE === "github"

export function keystaticReady() {
  if (!keystaticGithubMode) return true
  // In dev, Keystatic's own setup screen creates the GitHub App, so let it through.
  if (process.env.NODE_ENV === "development") return true
  return Boolean(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID && process.env.KEYSTATIC_GITHUB_CLIENT_SECRET && process.env.KEYSTATIC_SECRET,
  )
}
