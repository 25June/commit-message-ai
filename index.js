#!/usr/bin/env node

import path from 'path';
import dotenv from 'dotenv';

import {
  OpenAICommitService,
  GeminiCommitService,
  DefaultCommitService,
} from './commit-message.js';
import { getChangedFiles, readFiles } from './get-files.js';
import { chooseProvider, chooseContentOption } from './steps.js';

dotenv.config({ path: path.join(process.cwd(), '.env') });

async function startProcess(aiClient, contentOption) {
  console.log('📂 Getting differences content...');
  const files = getChangedFiles();
  if (files.length === 0) {
    console.log('No staged files found.');
    process.exit(1);
  }

  const fileContents = readFiles(files);
  console.log('🤖 Asking OpenAI for commit message...');
  const commitMessage = await aiClient.getMessage(fileContents, contentOption);

  console.log('📝 Suggested Commit Message:\n');
  console.log(commitMessage);
}

(async () => {
  const provider = await chooseProvider();
  const contentOption = await chooseContentOption();
  if (provider === 'OpenAI') {
    console.log('✅ You chose OpenAI, initializing OpenAI client...');
    const openAI = new OpenAICommitService(
      process.env.OPEN_AI_API_KEY,
      process.env.OPEN_AI_DOMAIN || ''
    );
    await startProcess(openAI, contentOption);
  } else if (provider === 'Gemini') {
    console.log('✅ You chose Gemini, initializing Gemini client...');
    const gemini = new GeminiCommitService(
      process.env.GEMINI_AI_API_KEY,
      'https://api.gemini.com/v1'
    );
    await startProcess(gemini, contentOption);
  } else {
    console.log('✅ You chose Default, initializing Default client...');
    const service = new DefaultCommitService();
    await startProcess(service, contentOption);
  }
})();
