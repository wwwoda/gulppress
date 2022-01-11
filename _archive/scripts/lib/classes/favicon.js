"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Favicon = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

var _through = _interopRequireDefault(require("through2"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const sizeOf = require('image-size');

const faviconData = [{
  size: 16,
  error: '16x16 | Generic',
  html: '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">'
}, {
  size: 32,
  error: '32x32 | Generic',
  html: '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">'
}, {
  size: 48,
  error: '48x48 | Generic',
  html: '<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">'
}, {
  size: 96,
  error: '96x96 | Generic',
  html: '<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">'
}, {
  size: 128,
  error: '128x128 | Generic, Chrome Web Store icon',
  html: '<link rel="icon" type="image/png" sizes="128x128" href="/favicon-128.png">'
}, {
  size: 192,
  error: '192x192 | Generic, Google Developer Web App Manifest Recommendation',
  html: '<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png">'
}, {
  size: 120,
  error: '120x120 | apple-touch-icon for iPhone old',
  html: '<link rel="apple-touch-icon" href="/apple-touch-icon.png">'
}, {
  size: 152,
  error: '152x152 | apple-touch-icon for iPad',
  html: '<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">'
}, {
  size: 167,
  error: '167x167 | apple-touch-icon for iPad Retina',
  html: '<link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png">'
}, {
  size: 180,
  error: '180x180 | apple-touch-icon for iPhone Retina',
  html: '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">'
}, {
  size: 128,
  html: '<meta name="msapplication-square70x70logo" content="/favicon-128.png"/>'
}, {
  size: 270,
  error: '270x270 | Microsoft Tile',
  html: `<meta name="msapplication-square150x150logo"
      content="/favicon-270.png"/>\n<meta name="msapplication-TileImage"
      content="/favicon-270.png" />`
}, {
  size: 512,
  error: '512x512 | Google Developer Web App Manifest Recommendation'
}];

class Favicon {
  constructor() {
    _defineProperty(this, "size", void 0);

    _defineProperty(this, "color", void 0);

    _defineProperty(this, "defaultColor", '#ffffff');

    _defineProperty(this, "baseManifest", {
      name: '',
      short_name: '',
      icons: [],
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone'
    });

    _defineProperty(this, "processImage", _through.default.obj((imageFile, _enc, cb) => {
      const size = sizeOf(imageFile.path);
      const imageSize = this.setSize(Math.min(size.width, size.height));
      console.log('---');
      console.log(_chalk.default.yellow(`Your favicon base image’s size is ${size.width}x${size.height}`));
      console.log('---');

      if (!Favicon.isSquare(size)) {
        console.log(_chalk.default.red('Your favicon base image should be square!'));
        console.log('---');
      }

      const data = Favicon.getFaviconDataSortedBySize();

      if (imageSize < data[data.length - 1].size) {
        console.log(_chalk.default.red('We recommed your favicon base image to be at least 512x512!'));
        console.log('---');
        console.log(_chalk.default.red('Gulp will skip creating following icons:'));
        data.forEach(entry => {
          if (imageSize < entry.size && entry.error) {
            console.log(_chalk.default.red(`- ${entry.error}`));
          }
        });
        console.log('---');
      }

      cb(null, imageFile);
    }));
  }

  static isSquare(size) {
    return size.width === size.height;
  }

  getSize() {
    return this.size;
  }

  setSize(size) {
    this.size = size;
    return size;
  }

  getColor() {
    return this.color;
  }

  setColor(color) {
    const isvalidHexColor = Favicon.isValidHexColor(color);

    if (isvalidHexColor === false) {
      console.log('---');
      console.log(_chalk.default.red(`Invalid HEX color configured: "${color}"!
        Example for correct color: "#ffffff"`));
      console.log('---');
    }

    this.color = isvalidHexColor === true ? color : this.defaultColor;
  }

  getHtml() {
    const {
      size
    } = this;
    let html = '';
    faviconData.forEach(entry => {
      if (size >= entry.size && entry.html) {
        html += `${entry.html}\n`;
      }
    });

    if (this.size >= 128) {
      html += `<meta name="msapplication-TileColor" content="${this.color}"/>\n`;
      html += '<meta name="msapplication-config" content="none"/>\n';
    }

    if (this.size >= 16) {
      html += '<link rel="manifest" href="/manifest.json">';
    }

    return html;
  }

  static getReponsiveConfigs(sizes) {
    return sizes.map(size => {
      if (typeof size === 'number') {
        return Favicon.getResponsiveConfig(size);
      }

      return Favicon.getResponsiveConfig(size.size, size.rename);
    });
  }

  getManifest() {
    if (this.size < 16) {
      return '';
    }

    return JSON.stringify(this.getManifestJson(), null, '\t');
  }

  static getFaviconDataSortedBySize() {
    const newArray = [...faviconData];
    return newArray.sort((a, b) => a.size - b.size);
  }

  getManifestJson() {
    const {
      color,
      size
    } = this;
    const manifest = this.baseManifest;

    if (Favicon.isValidHexColor(color)) {
      manifest.theme_color = color;
      manifest.background_color = color;
    }

    [16, 48, 128, 192, 512].forEach(s => {
      if (size >= s) {
        manifest.icons.push(Favicon.getManifestIcon(s));
      }
    });
    return manifest;
  }

  static isValidHexColor(color) {
    const re = /#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?/g;
    return re.test(color);
  }

  static getResponsiveConfig(size, rename) {
    return {
      width: size,
      height: size,
      fit: 'cover',
      skipOnEnlargement: true,
      rename: rename || `favicon-${size}.png`
    };
  }

  static getManifestIcon(size) {
    return {
      src: `/favicon-${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png'
    };
  }

}

exports.Favicon = Favicon;