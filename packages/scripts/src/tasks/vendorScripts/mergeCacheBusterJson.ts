import { TaskFunction, dest, src } from 'gulp';

import * as gulppress from '../../types';

const mergeJson = require('gulp-merge-json');

export function mergeCacheBusterJsonTask(
  folder: string,
  json: gulppress.IndexedObject | (() => gulppress.IndexedObject),
): TaskFunction {
  return () => (mergeCacheBusterJsonStream(folder, json));
}

export function mergeCacheBusterJsonStream(
  folder: string,
  json: gulppress.IndexedObject | (() => gulppress.IndexedObject),
): NodeJS.ReadWriteStream {
  return src(`${folder}/.assets.json`)
    .pipe(
      mergeJson({
        fileName: '.assets.json',
        edit: (parsedJson: any) => ({
          ...parsedJson,
          ...(json instanceof Function ? json() : json),
        }),
      }),
    )
    .pipe(dest(folder));
}
