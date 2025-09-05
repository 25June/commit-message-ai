import inquirer from 'inquirer';

export async function chooseProvider() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'provider',
      message: 'Which AI provider do you want to use?',
      choices: ['OpenAI', 'Gemini', 'Default'],
    },
  ]);

  return answers.provider;
}
