const { Octokit } = require('@octokit/rest');
const { execSync } = require('child_process');

/**
 * Analyzes the code for security and style issues.
 * @param {string} owner - Repository owner.
 * @param {string} repo - Repository name.
 * @param {string} sha - Commit SHA.
 * @returns {Promise<Array>} - Array of issues found.
 */
async function analyzeCode(owner, repo, sha) {
  const issues = [];
  const github = new Octokit({ auth: process.env.GITHUB_TOKEN });

  // Fetch the code diff
  const { data: diff } = await github.repos.compareCommits({
    owner,
    repo,
    base: sha,
    head: `${sha}^`,
  });

  // Example: Check for hardcoded secrets
  diff.files.forEach(file => {
    const content = execSync(`git show ${sha}:${file.filename}`).toString();
    if (content.includes('password') || content.includes('secret')) {
      issues.push({
        type: 'Security',
        message: 'Potential hardcoded secret detected.',
        file: file.filename,
        line: 1,
      });
    }
  });

  // Example: Check for style violations (simplified)
  diff.files.forEach(file => {
    if (file.filename.endsWith('.js')) {
      const content = execSync(`git show ${sha}:${file.filename}`).toString();
      if (content.includes('console.log')) {
        issues.push({
          type: 'Style',
          message: 'Avoid using console.log in production code.',
          file: file.filename,
          line: content.split('\n').findIndex(line => line.includes('console.log')) + 1,
        });
      }
    }
  });

  return issues;
}

module.exports = { analyzeCode };