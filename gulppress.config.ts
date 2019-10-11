import gulpPress from './src/interfaces';

/* eslint max-len: ["off"] */
/**
 * GulpPress Configuration File
 *
 * @package GulpPress
 */

const basePath = '.';

// Browsers to consider for autoprefixing (https://github.com/ai/browserslist)
// The following list is set as per WordPress requirements:
// https://github.com/WordPress/gutenberg/tree/master/packages/browserslist-config
const browserList = [
  '> 1%',
  'ie >= 11',
  'last 1 Android versions',
  'last 1 ChromeAndroid versions',
  'last 2 Chrome versions',
  'last 2 Firefox versions',
  'last 2 Safari versions',
  'last 2 iOS versions',
  'last 2 Edge versions',
  'last 2 Opera versions',
];

const config: gulpPress.MainConfig = {
  // Project Options
  project: {
    basePath,
    projectURL: '',
    environment: 'development', // Override .env option. Available options → 'development' or 'staging' or 'production'
    envFile: './.env',
    createSeparateMinFiles: true,
  },
  // https://www.browsersync.io/docs/options
  browserSync: {
    ghostMode: false,
    injectChanges: true,
    open: true,
    tunnel: false,
  },
  // Script Options
  scripts: {
    src: `${basePath}/assets/src/scripts/*.+(js|ts)`,
    dest: `${basePath}/assets/dist/scripts`,
    targets: browserList,
  },
  // Style options
  styles: {
    src: `${basePath}/assets/src/styles/*.scss`,
    dest: `${basePath}/assets/dist/styles`,
    autoprefixerOptions: {
      overrideBrowserslist: browserList,
    },
    postcssPlugins: [],
    sassOptions: {
      includePaths: [
        './node_modules',
      ],
      outputStyle: 'nested',
      precision: 5,
    },
  },
  // Favicon options
  favicon: {
    src: `${basePath}/assets/src/favicon/favicon.+(ico|png)`,
    dest: `${basePath}/assets/dist/favicon`,
  },
  // Font options
  fonts: {
    srcPath: `${basePath}/assets/src/fonts`,
    src: `${basePath}/assets/src/fonts/*.+(ttf|woff|woff2)`,
    dest: `${basePath}/assets/dist/fonts`,
  },
  // Image options
  images: {
    src: `${basePath}/assets/src/images/**/*.+(jpg|jpeg|png|svg)`,
    dest: `${basePath}/assets/dist/images`,
    destPhpPartials: `${basePath}/assets/dist/partials`,
  },
  // Icon options
  icons: {
    src: `${basePath}/assets/src/icons/**/*.svg`,
    dest: `${basePath}/assets/dist/icons`,
  },
  // Modernizr options
  modernizr: {
    src: `${basePath}/assets/src/scripts/main.js`,
    dest: `${basePath}/assets/dist/scripts`,
    modernizrOptions: {
      crawl: true,
      tests: [
        'touchevents',
        'json',
        'canvas',
        'cssfilters',
      ],
      uglify: true,
    },
  },
  // Translation optione
  translation: {
    src: `${basePath}/php/**/*.php`,
    dest: `${basePath}/assets/dist/gulppress.pot`,
    wpPotOptions: {
      domain: 'gulppress',
      package: 'GulpPress',
      bugReport: 'https://github.com/wwwoda/gulppress',
      lastTranslator: 'David Mondok <your_email@email.com>',
      team: 'David Mondok <your_email@email.com>',
    },
  },
};

export default config;
