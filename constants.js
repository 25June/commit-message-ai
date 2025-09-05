export const DEFAULT_MESSAGE = 'Default message';
export const PROMPT_TEST_SYSTEM =
  'You are a helpful technical assistant that writes clear, conventional commit messages.';
export const PROMPT_TEST_USER = 'How many kinds of commit messages are there?';
export const PROMPT_COMMIT_SYSTEM =
  'You are a helpful assistant that writes clear, conventional commit messages.';
export const PROMPT_COMMIT_USER = (data) =>
  `Here are the staged file changes:\n\n${data}\n\nGenerate a commit message:`;
