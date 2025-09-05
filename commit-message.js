import openAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import {
  PROMPT_TEST_SYSTEM,
  PROMPT_TEST_USER,
  PROMPT_COMMIT_SYSTEM,
  PROMPT_COMMIT_USER,
  DEFAULT_MESSAGE,
} from './constants.js';

class CommitService {
  message = DEFAULT_MESSAGE;
  constructor(apiKey, baseURL) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  getTestMessage() {
    return this.message;
  }
  getMessage() {
    return this.message;
  }
}

class OpenAICommitService extends CommitService {
  constructor(apiKey, baseURL) {
    super(apiKey, baseURL);
    this.client = new openAI.OpenAI({
      baseURL: this.baseURL,
      apiKey: this.apiKey,
    });
  }

  async getTestMessage() {
    const response = await this.client.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
          role: 'system',
          content: PROMPT_TEST_SYSTEM,
        },
        {
          role: 'user',
          content: PROMPT_TEST_USER,
        },
      ],
      stream: false,
      function_call: 'auto',
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log('🤖 OpenAI Analysis:\n');
    return response.choices[0].message.content;
  }

  async getMessage(files) {
    if (!this.apiKey) {
      console.error(
        '❌ No API key found. Set OPEN_AI_API_KEY in .env or environment.'
      );
      process.exit(1);
    }
    const prompt = files
      .map((f) => `File: ${f.file}\nContent:\n${f.content}\n`)
      .join('\n---\n');
    const response = await this.client.chat.completions.create({
      model: 'gpt-4.1',
      messages: [
        {
          role: 'system',
          content: PROMPT_COMMIT_SYSTEM,
        },
        {
          role: 'user',
          content: PROMPT_COMMIT_USER(prompt),
        },
      ],
      stream: false,
      function_call: 'auto',
      temperature: 0.7,
      max_tokens: 1000,
    });

    console.log('🤖 OpenAI Analysis:\n');
    return response.choices[0].message.content;
  }
}

class GeminiCommitService extends CommitService {
  constructor(apiKey, baseURL) {
    super(apiKey, baseURL);
    this.client = new GoogleGenAI({
      apiKey: this.apiKey,
    });
  }

  async getTestMessage() {
    const response = await this.client.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: `You are a helpful technical assistant that writes clear, conventional commit messages. How many kinds of commit messages are there?`,
    });
    console.log('🤖 Gemini AI Analysis:\n');
    return response.text;
  }

  async getMessage(files) {
    if (!this.apiKey) {
      console.error(
        '❌ No API key found. Set GEMINI_AI_API_KEY in .env or environment.'
      );
      process.exit(1);
    }
    const prompt = files
      .map((f) => `File: ${f.file}\nContent:\n${f.content}\n`)
      .join('\n---\n');
    const response = await this.client.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: PROMPT_COMMIT_SYSTEM + PROMPT_COMMIT_USER(prompt),
    });

    console.log('🤖 Gemini AI Analysis:\n');
    return response.text;
  }
}

class DefaultCommitService extends CommitService {
  constructor() {
    super();
  }
}

export { OpenAICommitService, GeminiCommitService, DefaultCommitService };
