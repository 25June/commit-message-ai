# Commit Message AI 🤖

A smart CLI tool that generates meaningful commit messages by analyzing your staged Git changes using AI providers like OpenAI and Google Gemini.

## Features

- 🎯 **Smart Analysis**: Analyzes your staged files to understand code changes
- 🤖 **Multiple AI Providers**: Support for OpenAI, Google Gemini, or default templates
- 📝 **Quality Messages**: Generates conventional commit messages following best practices
- ⚡ **Easy to Use**: Simple CLI interface with interactive provider selection
- 🔒 **Secure**: Uses environment variables for API keys

## Installation

1. Clone this repository:

```bash
git clone <your-repo-url>
cd commit-message-ai
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables by creating a `.env` file:

```bash
cp .env.example .env
```

4. Add your API keys to the `.env` file:

```env
OPEN_AI_API_KEY=your_openai_api_key_here
GEMINI_AI_API_KEY=your_gemini_api_key_here
OPEN_AI_DOMAIN=https://api.openai.com/v1  # Optional, defaults to OpenAI's API
```

5. Make the tool globally available:

```bash
npm link
```

## Usage

1. Stage your changes in Git:

```bash
git add .
```

2. Run the commit message generator:

```bash
commit-message
```

3. Choose your preferred AI provider:
   - **OpenAI**: Uses GPT models for commit message generation
   - **Gemini**: Uses Google's Gemini AI for commit message generation
   - **Default**: Uses predefined templates (no API key required)

4. The tool will analyze your staged files and suggest a commit message!

## How It Works

1. **File Analysis**: Scans your staged Git files
2. **Content Reading**: Reads the actual changes in your files
3. **AI Processing**: Sends the changes to your chosen AI provider
4. **Message Generation**: Returns a well-formatted commit message

## Project Structure

```
commit-message-ai/
├── index.js              # Main CLI entry point
├── commit-message.js     # AI service implementations
├── get-files.js         # Git file operations
├── choose-provider.js   # Interactive provider selection
├── constants.js         # Configuration constants
├── package.json         # Project dependencies
└── .env                 # Environment variables
```

## Dependencies

- `@google/genai` - Google Gemini AI integration
- `dotenv` - Environment variable management
- `inquirer` - Interactive CLI prompts
- `openai` - OpenAI API integration

## Requirements

- Node.js (version 14 or higher)
- Git repository with staged changes
- API keys for your chosen AI provider

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Commit your changes: `git commit -m "Add some feature"`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions, please open an issue on this repository.

---

**Happy committing! 🚀**
