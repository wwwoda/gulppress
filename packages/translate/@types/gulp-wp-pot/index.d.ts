// Type definitions for gulp-wp-pot 2.5.0
// Project: https://github.com/wp-pot/gulp-wp-pot#readme
// Definitions by: Woda <https://github.com/wwwoda>
// TypeScript Version: 2.2

/// <reference types="node" />

declare module 'gulp-wp-pot' {
  import type { Transform } from 'stream';
  import type { IOptions } from 'glob';

  interface GetTextFunction {
    name: string;
    plural?: number;
    context?: number;
  }

  interface WpPotOptions {
    bugReport?: string;
    commentKeyword?: string;
    copyrightText?: string;
    domain?: string;
    headers?: boolean | Record<string, string>;
    gettextFunctions?: GetTextFunction[];
    lastTranslator?: string;
    metadataFile?: string;
    noFilePaths?: boolean;
    package?: string;
    relativeTo?: string;
    globOpts?: IOptions,
    team?: string;
    ignoreTemplateNameHeader?: boolean;
  }

  export default function wpPot(options?: WpPotOptions): Transform;
}
