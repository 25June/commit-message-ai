import fs from 'fs';
import { execSync } from 'child_process';

export function getChangedFiles() {
  const output = execSync('git diff --cached --name-only', {
    encoding: 'utf8',
  });
  return output.split('\n').filter((file) => file);
}

export function readFiles(files) {
  return files.map((file) => {
    try {
      const content = execSync(`git diff --cached ${file} | tail -n +5`, {
        encoding: 'utf8',
      });
      return { file, content: content };
    } catch (err) {
      return { file, content: `[Error reading file: ${err.message}]` };
    }
  });
}
