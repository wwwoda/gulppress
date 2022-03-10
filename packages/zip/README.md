# @gulppress/translate

> Generate pot files for WordPress plugins and themes with [`wp-pot`](https://github.com/wp-pot/wp-pot)

@gulppress/translate is part of the [gulppress](https://github.com/wwwoda/gulppress) workflow to build assets for WordPress.**Check out the [gulppress documentation](https://github.com/wwwoda/gulppress) before using to take full advantage of everything it has to offer.**

## Install

```
$ npm install --save-dev @gulppress/translate
```

## Usage

### Basic

```js
import { task } from 'gulp';
import getTranslationTask from '@gulppress/translate';

task('translate', getTranslationTask({
    src: './**/*.php',
    dest: './languages/test.pot',
}));
```

### With custom [wp-pot options](#wpPotOptions)

```js
import { task } from 'gulp';
import getTranslationTask from '@gulppress/translate';

task('translate', getTranslationTask({
    src: './**/*.php',
    dest: './languages/test.pot',
    wpPotOptions: {
        domain: 'gulppress',
        lastTranslator: 'John Doe <me@example.com>',
        package: 'gulppress',
        team: 'Team <team@example.com>',
    }
}));
```

## API

### src

Type: `string | string[]`

A glob string or an array of glob strings.

Gets  be passed to [`gulp.src()`](https://gulpjs.com/docs/en/api/src/).

### dest

Type: `string | string[]`

The path of the output directory where files will be written.

Gets passed to [`gulp.dest()`](https://gulpjs.com/docs/en/api/dest/).

### wpPotOptions

Type: `object`

See available options in the wp-pot readme, <https://github.com/wp-pot/wp-pot#options>

All options except `src`, `writeFile`, and `destFile` is passed to wp-pot.

## Related

- [wp-pot](https://github.com/wp-pot/wp-pot)

## License

MIT © [Woda](https://github.com/wwwoda)
