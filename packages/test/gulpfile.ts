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
  src: './assets/fonts/**/*',
  dest: './build/fonts',
  fontFactoryConfigs: {
    '*.ttf': [{
      format: ['woff', 'woff2', 'ttf'],
      subsetUnicodeBlockRanges: ['Latin Alphabet', 'Digits', 'German', 'Punctuation & Symbols Minimal'],
      rename: {
        suffix: '-subset',
      },
    }, {
      format: ['woff', 'woff2', 'ttf'],
      subsetUnicodeBlockRanges: ['Basic Latin', 'Latin-1 Supplement', 'German'],
    }],
    '*.woff': {
      format: ['woff', 'woff2', 'ttf'],
      subsetUnicodeBlockRanges: ['Basic Latin'],
      rename: {
        suffix: '-from-woff',
      },
    },
    '*.woff2': {
      format: ['woff', 'woff2', 'ttf'],
      subsetText: 'ABCabc',
      rename: {
        suffix: '-from-woff2',
      },
    },
  },
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
