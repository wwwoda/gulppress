declare module 'gulp-wp-pot' {
  import type { Transform } from 'stream';

  export interface WpPotOptions {
    bugReport?: string;
    commentKeyword?: string;
    domain?: string;
    headers?: boolean | Record<string, string>;
    gettextFunctions?: Record<string, string>;
    lastTranslator?: string;
    metadataFile?: string;
    noFilePaths?: boolean;
    package?: string;
    relativeTo?: string;
    globOpts?: Record<string, string>;
    team?: string;
    ignoreTemplateNameHeader?: boolean;
  }

  export default function wpPot(options?: WpPotOptions): Transform;
}
