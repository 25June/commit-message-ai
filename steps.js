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

export async function chooseContentOption() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'contentOption',
      message: 'Which content option do you want to generate?',
      choices: ['One simple sentence', 'Detail'],
    },
  ]);
  return answers.contentOption;
}
