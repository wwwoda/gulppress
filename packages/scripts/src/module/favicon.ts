import chalk from 'chalk';
import through from 'through2';

const sizeOf = require('image-size');

export type FaviconData = {
  size: number;
  error?: string;
  html?: string;
}[];

export type Manifest = {
  name: '';
  short_name: '';
  icons: ManifestIcon[],
  theme_color: string,
  background_color: string,
  display: 'standalone',
};

export type ManifestIcon = {
  src: string;
  sizes: string;
  type: 'image/png';
};

export type ResponsiveConfig = {
  width: number;
  height: number;
  fit: 'cover';
  skipOnEnlargement: true;
  rename: string;
};

export type Size = number | {size: number, rename: string};

export type Sizes = Array<Size>;

export type ValidColorString = string & { __validColorString: true };

export type SizeOfResponse = {
  width: number;
  height: number;
  type: string;
};

const faviconData: FaviconData = [
  {
    size: 16,
    error: '16x16 | Generic',
    html: '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">',
  },
  {
    size: 32,
    error: '32x32 | Generic',
    html: '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">',
  },
  {
    size: 48,
    error: '48x48 | Generic',
    html: '<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png">',
  },
  {
    size: 96,
    error: '96x96 | Generic',
    html: '<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png">',
  },
  {
    size: 128,
    error: '128x128 | Generic, Chrome Web Store icon',
    html: '<link rel="icon" type="image/png" sizes="128x128" href="/favicon-128.png">',
  },
  {
    size: 192,
    error: '192x192 | Generic, Google Developer Web App Manifest Recommendation',
    html: '<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png">',
  },
  {
    size: 120,
    error: '120x120 | apple-touch-icon for iPhone old',
    html: '<link rel="apple-touch-icon" href="/apple-touch-icon.png">',
  },
  {
    size: 152,
    error: '152x152 | apple-touch-icon for iPad',
    html: '<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">',
  },
  {
    size: 167,
    error: '167x167 | apple-touch-icon for iPad Retina',
    html: '<link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-167x167.png">',
  },
  {
    size: 180,
    error: '180x180 | apple-touch-icon for iPhone Retina',
    html: '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">',
  },
  {
    size: 128,
    html: '<meta name="msapplication-square70x70logo" content="/favicon-128.png"/>',
  },
  {
    size: 270,
    error: '270x270 | Microsoft Tile',
    html: '<meta name="msapplication-square150x150logo" content="/favicon-270.png"/>\n<meta name="msapplication-TileImage" content="/favicon-270.png" />',
  },
  {
    size: 512,
    error: '512x512 | Google Developer Web App Manifest Recommendation',
  },
];

export class FaviconHelper {
  public size!: number;

  public color!: string;

  private readonly defaultColor = '#ffffff';

  private readonly baseManifest: Manifest = {
    name: '',
    short_name: '',
    icons: [],
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
  };



  public processImage = through.obj((imageFile, enc, cb) => {
    const size: SizeOfResponse = sizeOf(imageFile.path);
    const imageSize = this.setSize(Math.min(size.width, size.height));
    console.log('---');
    console.log(chalk.yellow(`Your favicon base image’s size is ${size.width}x${size.height}`));
    console.log('---');
    if (!FaviconHelper.isSquare(size)) {
      console.log(chalk.red('Your favicon base image should be square!'));
      console.log('---');
    }

    const data = FaviconHelper.getFaviconDataSortedBySize();
    if (imageSize < data[data.length - 1].size) {
      console.log(chalk.red('We recommed your favicon base image to be at least 512x512!'));
      console.log('---');
      console.log(chalk.red('Gulp will skip creating following icons:'));
      data.forEach(entry => {
        if (imageSize < entry.size && entry.error) {
          console.log(chalk.red(`- ${entry.error}`));
        }
      });
      console.log('---');
    }
    cb(null, imageFile);
  });

  private static isSquare(size: SizeOfResponse): boolean {
    return size.width === size.height;
  }

  public getSize(): number {
    return this.size;
  }

  public setSize(size: number): number {
    this.size = size;
    return size;
  }

  public getColor(): string {
    return this.color;
  }

  public setColor(color: string): void {
    const isvalidHexColor = FaviconHelper.isValidHexColor(color);
    if (isvalidHexColor === false) {
      console.log('---');
      console.log(chalk.red(`Invalid HEX color configured: "${color}"! Example for correct color: "#ffffff"`));
      console.log('---');
    }
    this.color = isvalidHexColor === true ? color : this.defaultColor;
  }

  public getHtml(): string {
    const {
      size,
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

  public static getReponsiveConfigs(sizes: Sizes): ResponsiveConfig[] {
    return sizes.map(size => {
      if (typeof size === 'number') {
        return FaviconHelper.getResponsiveConfig(size);
      }
      return FaviconHelper.getResponsiveConfig(size.size, size.rename);
    });
  }

  public getManifest(): string {
    if (this.size < 16) {
      return '';
    }
    return JSON.stringify(this.getManifestJson(), null, '\t');
  }

  private static getFaviconDataSortedBySize(): FaviconData {
    const newArray: FaviconData = [...faviconData];
    return newArray.sort((a, b) => a.size - b.size);
  }

  private getManifestJson(): Manifest {
    const {
      color,
      size,
    } = this;
    const manifest: Manifest = this.baseManifest;


    if (FaviconHelper.isValidHexColor(color)) {
      manifest.theme_color = color;
      manifest.background_color = color;
    }

    [16, 48, 128, 192, 512].forEach(s => {
      if (size >= s) {
        manifest.icons.push(FaviconHelper.getManifestIcon(s));
      }
    });

    return manifest;
  }

  private static isValidHexColor(color: string): color is ValidColorString {
    const re = /#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?/g;
    return re.test(color);
  }

  private static getResponsiveConfig(size: number, rename?: string): ResponsiveConfig {
    return {
      width: size,
      height: size,
      fit: 'cover',
      skipOnEnlargement: true,
      rename: rename || `favicon-${size}.png`,
    };
  }

  private static getManifestIcon(size: number): ManifestIcon {
    return {
      src: `/favicon-${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png',
    };
  }
}
