import inquirer from 'inquirer';

const runInquerer = async (): Promise<inquirer.Answers> => inquirer.prompt(getQuestions());

const getQuestions = (): inquirer.QuestionCollection => [
  {
    type: 'checkbox',
    name: 'tasks',
    message: 'Select tasks GulpPress should take care of',
    pageSize: getFeatureChoices().length,
    choices: getFeatureChoices(),
  },
  {
    type: 'input',
    name: 'srcPath',
    message: 'Source folder path',
    default: './ressources/assets/',
  },
  {
    type: 'input',
    name: 'distPath',
    message: 'Destination folder path',
    default: '/assets/',
  },
  {
    type: 'confirm',
    name: 'cache',
    message: 'Cache your answers for next run?',
    default: true,
  },
];

const getFeatureChoices = () => [
  {
    name: 'Favicon - Generate favicons and manifest.json',
    value: 'favicon',
  }, {
    name: 'Fonts - Convert and process fonts',
    value: 'fonts',
  }, {
    name: 'Icons - Minify icons and create php partials',
    value: 'icons',
  }, {
    name: 'Images - Convert and minify images',
    value: 'images',
  }, {
    name: 'Translation - Generate .pot file',
    value: 'translation',
  },
];

export default runInquerer;
