import { parallel, task } from 'gulp';
import getFaviconTask from '@gulppress/favicon';
import getFontsTask from '@gulppress/fonts';
import getImagesTask, { getClearImagesCacheTask } from '@gulppress/images';
import getTranslationTask from '@gulppress/translate';

task('favicon', getFaviconTask({
  src: './assets/images/1000.svg',
  dest: './build/favicon',
  manifest: {
    name: 'Test',
    short_name: 'Test',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    display: 'browser',
  },
}));

task('fonts', getFontsTask({
  src: './assets/fonts/**/*',
  dest: './build/fonts',
}));

task('images', getImagesTask({
  src: './assets/images/**/*',
  dest: './build/images',
  destPhpPartials: './build/partials/images',
}));

task('icons', getImagesTask({
  src: './assets/icons/**/*',
  dest: './build/icons',
  destPhpPartials: './build/partials/icons',
  displayName: 'icons',
}));

task('translate', getTranslationTask({
  src: 'php/**/*.php',
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
