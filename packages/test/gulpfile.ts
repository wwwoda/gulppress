import { parallel, task } from 'gulp';
import getFaviconTask from '@gulppress/favicon';
import getFontsTask from '@gulppress/fonts';
import getImagesTask, { getClearImagesCacheTask } from '@gulppress/images';
import getTranslationTask from '@gulppress/translate';

task('favicon', getFaviconTask({
  src: './assets/images/favicon.svg',
  dest: './build/favicon',
  manifest: {
    name: 'Test',
    short_name: 'Test',
    background_color: '#fcb900',
    theme_color: '#fcb900',
    display: 'browser',
  },
}));

task('fonts', getFontsTask({
  src: './assets/fonts/**/inter*.ttf',
  dest: './build/fonts',
  fontFactoryConfigs: [{
    format: ['woff', 'woff2'],
    subsetUnicodeBlockRanges: [
      'Basic Latin',
      'Latin-1 Supplement',
      'Spacing Modifier Letters',
      'Combining Diacritical Marks',
      'General Punctuation',
      'Number Forms',
      'German',
      'Punctuation & Symbols',
    ],
  }],
  fontFactoryOptions: {
    passThroughMatched: false,
    passThroughUnmatched: false,
  },
}));

task('images', getImagesTask({
  src: './assets/images/**/*',
  dest: './build/images',
  destPhpPartials: './build/partials/images',
  imageFactoryConfigs: {
    '*.jpeg': [
      { resize: { width: 100 }, format: ['webp', 'jpeg', 'png'], rename: { suffix: '-100' } },
      { resize: { width: 150 }, format: ['webp', 'jpeg', 'png'], rename: { suffix: '-150' } },
      { resize: { width: 200 }, format: ['webp', 'jpeg', 'png'], rename: { suffix: '-200' } },
    ],
    '*.png': {
      format: ['jpeg', 'png', 'webp', 'avif'],
      resize: {
        width: 100,
      },
      rename: { suffix: '-100' },
    },
  },
}));

task('icons', getImagesTask({
  src: './assets/icons/**/*',
  dest: './build/icons',
  destPhpPartials: './build/partials/icons',
  displayName: 'icons',
  imageminOptions: {
    svgo: {
      plugins: [
        { removeViewBox: false },
        { cleanupIDs: false },
        {
          removeAttrs: {
            attrs: '*:(stroke|fill):((?!^none$).)*',
          },
        },
      ],
    },
  },
  disableCache: true,
}));

task('translate', getTranslationTask({
  src: './assets/php/**/*.php',
  dest: 'build/languages/test.pot',
  // Available gulp-wp-pot options: https://github.com/wp-pot/wp-pot#options
  wpPotOptions: {
    domain: 'test',
    package: 'test',
  },
}));

task('clear-cache', getClearImagesCacheTask());

task('default', parallel(
  'favicon',
  'fonts',
  'icons',
  'images',
  'translate',
));
