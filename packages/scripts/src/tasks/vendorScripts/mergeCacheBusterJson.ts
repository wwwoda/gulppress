import { TaskFunction, dest, src } from 'gulp';

import * as gulppress from '../../types';

const mergeJson = require('gulp-merge-json');

export function mergeCacheBusterJsonTask(
  destFolder: string,
  json: gulppress.IndexedObject | (() => gulppress.IndexedObject),
): TaskFunction {
  return () => (mergeCacheBusterJsonStream(destFolder, json));
}

export function mergeCacheBusterJsonStream(
  destFolder: string,
  json: gulppress.IndexedObject | (() => gulppress.IndexedObject),
): NodeJS.ReadWriteStream {
  return src(`${destFolder}/.assets.json`)
    .pipe(
      mergeJson({
        fileName: '.assets.json',
        edit: (parsedJson: any) => ({
          ...parsedJson,
          ...(json instanceof Function ? json() : json),
        }),
      }),
    )
    .pipe(dest(destFolder));
}
