# @gulppress/fonts

> Transform, minify and subset any font format to `woff`, `woff2`, and `ttf`.

@gulppress/translate is part of the [gulppress](https://github.com/wwwoda/gulppress) workflow to build assets for WordPress.

**Check out the [gulppress documentation](https://github.com/wwwoda/gulppress) before using to take full advantage of everything it has to offer.**

## Install

```
$ npm install --save-dev @gulppress/font
```

## Usage

This task relies on [@gulppress/gulp-font-factory](https://github.com/wwwoda/gulppress/blob/master/packages/gulp-font-factory/README.md).

You can find more examples and detailed documetation in the [readme](https://github.com/wwwoda/gulppress/blob/master/packages/gulp-font-factory/README.md).

### Basic

This very basic configuration wihtout any subsetting will make sure that every font is availables in the `woff` and `woff2` format.

```js
import { parallel, task } from 'gulp';
import getFontsTask from '@gulppress/fonts';

task('fonts', getFontsTask({
    src: './assets/fonts/**/*.{otf,ttf,woff,woff2}',
    dest: './build/fonts',
    fontFactoryConfigs: {
        format: ['woff', 'woff2'],
    },
}));
```

### Advanced

The following configuration illustrates advanced features like

- Individual configurations for different font families
- Subsetting of fonts
- Create additional versions of a font with a critical subset used in a [2-stage font loading strategy](https://www.zachleat.com/web/comprehensive-webfonts/)

```js
import { parallel, task } from 'gulp';
import getFontsTask from '@gulppress/fonts';

task('fonts', getFontsTask({
    src: './assets/fonts/**/*.{otf,ttf,woff,woff2}',
    dest: './build/fonts',
    fontFactoryConfigs: {
        'roboto-*': [
            {
                format: ['woff', 'woff2'],
                subsetUnicodeBlockRanges: ['Basic Latin'],
                rename: {
                    suffix: '-critical',
                },
            }, {
                format: ['woff', 'woff2'],
                subsetUnicodeBlockRanges: [
                    'Basic Latin',
                    'Latin-1 Supplement',
                    'Latin Extended-A',
                    'Latin Extended-B',
                ],
            }
        ],
        'merriweather-*': {
            format: ['woff', 'woff2'],
            subsetUnicodeBlockRanges: ['Latin Alphabet'],
        },
    },
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

### fontFactoryConfigs

Type: `Object`

Passed to `gulppress/gulp-font-factory`. Check out the [configurations API](https://github.com/wwwoda/gulppress/blob/master/packages/gulp-font-factory/README.md#).

### fontFactoryOptions

Type: `Object`

Passed to `gulppress/gulp-font-factory`. Check out the [options API](https://github.com/wwwoda/gulppress/blob/master/packages/gulp-font-factory/README.md#).

## Related

* [@gulppress/gulp-font-factory](https://github.com/wwwoda/gulppress/blob/master/packages/gulp-font-factory/README.md)

## License

MIT © [Woda](https://github.com/wwwoda)
