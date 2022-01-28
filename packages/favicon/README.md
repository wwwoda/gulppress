# @gulppress/translate

> Generate a smart and minimalist favicon setup that fits most modern needs.

@gulppress/translate is part of the [gulppress](https://github.com/wwwoda/gulppress) workflow to build assets for WordPress.

**Check out the [gulppress documentation](https://github.com/wwwoda/gulppress) before using this package take full advantage of everything it has to offer.**

## Description

In 2021 there is no need to generate and serve dozens of different favicons sizes.

All you need is just five icons and one JSON file.

This task generates everything you will need for a modern favicon setup from a single SVG file.

It was heavily inspired by [Andrey Sitnik](https://github.com/ai) and his awesome blog article [How to Favicon in 2021](https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs)

## Install

```
$ npm install --save-dev @gulppress/favicon
```

## Usage

In your `gulpfile.ts`:

```js
import { task } from 'gulp';
import getFaviconTask from '@gulppress/favicon';

task('favicon', getFaviconTask({
  src: './assets/favicon.svg',
  dest: './dest/favicon',
  manifest: {
    // You must provide a name
    name: 'GulpPress',
    // You must provide a short_name
    short_name: 'GulpPress',
    background_color: '#fcb900',
    theme_color: '#fcb900',
    display: 'browser',
  },
}));
```

This will generate the following 5 icons that you should copy into the root folder of your WordPress installation (location of the `wp-config.php` file).

- `favicon.ico`
- `icon.svg`
- `icon-192.png`
- `icon-512.png`
- `apple-touch-icon.png`

It will also generate the followign `manifest.json` file, that you should also copy to the same folder.

```json
{
  "name": "GulpPress",
  "short_name": "GulpPress",
  "background_color": "#fcb900",
  "theme_color": "#fcb900",
  "display": "browser",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

Finally it will generate a `favicon.html` file whose content you should print in the `<head>` tag. Here's an example implementation that you can place in your `functions.php` file:

```php
// Remove the default icon
add_filter( 'get_site_icon_url', '__return_false' );
// Show our custom icons in the frontend
add_action( 'wp_head', 'custom_favicon_html', 100 );
// Show our custom icons in the dashboard as well
add_action( 'admin_head', 'custom_favicon_html', 100 );

function custom_favicon_html() {
    ?>
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/icon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <link rel="manifest" href="/manifest.json">
    <?php
}
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

### manifest

Type: `object`

[**name**](https://developer.mozilla.org/en-US/docs/Web/Manifest/name)

Type: `string`

The `name` member is a string that represents the name of the web application as it is usually displayed to the user.

[**short_name**](https://developer.mozilla.org/en-US/docs/Web/Manifest/short_name)

Type: `string`

The `short_name` member is a string that represents the name of the web application displayed to the user if there is not enough space to display `name`.

[**background_color**](https://developer.mozilla.org/en-US/docs/Web/Manifest/background_color)

Type: `string`\
Default: `#ffffff`

The `background_color` member defines a placeholder background color for the application page to display before its stylesheet is loaded. This value is used by the user agent to draw the background color of a shortcut when the manifest is available before the stylesheet has loaded.

[**theme_color**](https://developer.mozilla.org/en-US/docs/Web/Manifest/theme_color)

Type: `string`\
Default: `#ffffff`

The `theme_color` member is a string that defines the default theme color for the application. This sometimes affects how the OS displays the site (e.g., on Android's task switcher, the theme color surrounds the site).

[**display**](https://developer.mozilla.org/en-US/docs/Web/Manifest/display)

Type: `fullscreen` | `standalone` | `minimal-ui` | `browser`\
Default: 'browser'

The `display` member is a string that determines the developers’ preferred display mode for the website.

**All other options**

Please check out the [type definitions](https://github.com/wwwoda/gulppress/blob/master/packages/favicon/src/types.ts) for all other options.

## Related

* [Web app manifests](https://developer.mozilla.org/en-US/docs/Web/Manifest) on MDN Web Docs
* Official w3c web app manifest [specification](https://w3c.github.io/manifest/)

## License

MIT © [Woda](https://github.com/wwwoda)
