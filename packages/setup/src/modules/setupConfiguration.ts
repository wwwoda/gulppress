import inquirer from 'inquirer';

inquirer.registerPrompt('fuzzypath', require('inquirer-fuzzy-path'));


export default function setupConfiguration(): Promise<inquirer.Answers> {
  return inquirer.prompt([{
    type: 'fuzzypath',
    name: 'basePath',
    excludePath: (nodePath: string): boolean => nodePath.startsWith('node_modules'),
    itemType: 'directory',
    message: 'Select you theme\'s directory',
    // default: '.',
    suggestOnly: false,
  }]);

  // return answers;
}
