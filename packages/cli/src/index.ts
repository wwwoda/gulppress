// import chalk from 'chalk';
// import run from './modules/run';

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = parseInt(semver[0], 10);

// If below Node 8.
if (major < 8) {
  // eslint-disable-next-line  no-console
  console.error(
    // chalk.red(`GulpPress requires Node 8 or higher while you are running Node ${currentNodeVersion}\n
      Please update your version of Node.`),
  );
  process.exit(1);
}

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
  throw err;
});

/**
 * Run the entire program.
 *
 * Runs all the functions with async/await.
 */
console.log('gulppress');

// run();
