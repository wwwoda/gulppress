import del from 'del';
import { TaskFunction } from 'gulp';

import gulpress from '../interfaces';

function getDestPaths(config: gulpress.ProjectConfig): {
  [key: string]: string;
} {
  const dests: {
    [key: string]: string;
  } = {};
  for (const [key, value] of Object.entries(config)) {
    if (typeof value === 'object' && value.dest) {
      dests[key] = value.dest;
    }
  }
  return dests;
}

export default function (config: gulpress.ProjectConfig): {
  scriptsStyles: TaskFunction;
  assets: TaskFunction;
  all: TaskFunction;
} {
  const dests = getDestPaths(config);

  function scriptsStyles(): Promise<string[]> {
    const scriptsStylesArray: string[] = [];

    if (dests.scripts) { scriptsStylesArray.push(dests.scripts); }
    if (dests.styles) { scriptsStylesArray.push(dests.styles); }

    return del(scriptsStylesArray, { force: true });
  }

  function assets(): Promise<string[]> {
    const assetsArray: string[] = [];
    if (config.assets) {
      if (typeof config.assets === 'string') {
        assetsArray.push(config.assets);
      } else if (Array.isArray(config.assets)) {
        assetsArray.push(...config.assets);
      }
    }

    if (dests.favicon) { assetsArray.push(dests.favicon); }
    if (dests.fonts) { assetsArray.push(dests.fonts); }
    if (dests.icons) { assetsArray.push(dests.icons); }
    if (dests.images) { assetsArray.push(dests.images); }
    if (typeof config.images === 'object' && config.images.destPhpPartials) {
      assetsArray.push(config.images.destPhpPartials);
    }

    return del(assetsArray, { force: true });
  }

  function all(): Promise<string[]> {
    return del(
      Object.values(dests), {
        force: true,
      },
    );
  }

  return {
    scriptsStyles,
    assets,
    all,
  };
}
