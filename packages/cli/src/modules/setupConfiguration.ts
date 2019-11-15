import inquirer from 'inquirer';

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));


export default function setupConfiguration(): void {
  inquirer.prompt([{
    type: 'fuzzypath',
    name: 'basePath',
    excludePath: (nodePath: string): boolean => nodePath.startsWith('node_modules'),
    itemType: 'directory',
    message: 'Select you theme\'s directory',
    // default: '.',
    suggestOnly: false,
  }]).then(answers => {
    console.log(answers);
  });
}
