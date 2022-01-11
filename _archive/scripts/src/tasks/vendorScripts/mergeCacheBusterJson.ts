import { TaskFunction, dest, src } from 'gulp';

const mergeJson = require('gulp-merge-json');

export function mergeCacheBusterJsonTask(
  destFolder: string,
  json: Record<string, string> | (() => Record<string, string>),
): TaskFunction {
  return () => (mergeCacheBusterJsonStream(destFolder, json));
}

export function mergeCacheBusterJsonStream(
  destFolder: string,
  json: Record<string, string> | (() => Record<string, string>),
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
