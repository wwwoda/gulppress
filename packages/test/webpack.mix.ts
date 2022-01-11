import mix from 'laravel-mix';

mix
  .setPublicPath('build')
  .ts('assets/scripts/main.ts', 'build/js');

if (process.env.npm_lifecycle_event !== 'hot') {
  mix.version();
}
