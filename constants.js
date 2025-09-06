export const DEFAULT_MESSAGE = 'Default message';
export const PROMPT_COMMIT_SYSTEM = `You are a helpful assistant that writes clear, short and simple commit messages, focus on the changes and no need to explain it. 
    You also follow this pattern to construct the commit message:
    <type>(<scope>): <short summary> 
    Allowed <type> values: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
    The summary must be imperative, max 72 characters, and meaningful.
  `;
export const PROMPT_COMMIT_SYSTEM_DETAIL = `
  Generate a commit message and add add body text only because explanation is needed.
  `;
export const PROMPT_COMMIT_SYSTEM_SIMPLE = `Generate a commit message.`;
export const PROMPT_COMMIT_USER = (data, contentOption) =>
  `Here are the content after using command "git diff --cached":\n\n${data}\n\n${
    contentOption === 'Detail'
      ? PROMPT_COMMIT_SYSTEM_DETAIL
      : PROMPT_COMMIT_SYSTEM_SIMPLE
  }`;
