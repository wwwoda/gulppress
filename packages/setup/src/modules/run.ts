// import chalk from 'chalk';
// import download from 'download';
// import ora from 'ora';
import path from 'path';
import replace from 'replace-in-file';
import setupConfiguration from './setupConfiguration';
import copyFileSync from '../utils/copyFileSync';

// const theCWD = process.cwd();
// const theCWDArray = theCWD.split('/');
// const theDir = theCWDArray[theCWDArray.length - 1];

export default function run(): void {
  setupConfiguration().then(answers => {
    copyFileSync(path.resolve(__dirname, '../../templates/gulp.config.ts.template'), path.resolve('./gulp.config.ts'));
    replace({
      files: path.resolve('./gulp.config.ts'),
      from: [
        /{{basePath}}/g,
        /{{envFile}}/g,
      ],
      to: [
        answers.basePath,
        './.env',
      ],
    });
  });
  // const filesToDownload = [
  //   'https://raw.githubusercontent.com/wwwoda/gulppress/master/gulpfile.ts',
  //   'https://raw.githubusercontent.com/wwwoda/gulppress/master/gulp.config.ts',
  // ];
  // const spinner = ora({ text: '' });

  // spinner.start(`1. Downloading GulpPress files to → ${chalk.black.bgWhite(` ${theDir} `)}`);
  // Promise.all(filesToDownload.map(x => download(x, `${theCWD}`))).then(async () => {
  //   spinner.succeed();
  // console.log(path.resolve(__dirname, '../../templates/gulp.config.ts.template'));
  // console.log(path.resolve('./gulp.config.ts'));
  // });
}
