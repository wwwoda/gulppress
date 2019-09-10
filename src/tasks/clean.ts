import { TaskFunction } from 'gulp';

import del = require('del');

type AssetItemType = string | {
  dest: string;
};

interface CleanConfig {
  assets? : string | string[];
  favicon? : AssetItemType;
  fonts? : AssetItemType;
  icons? : AssetItemType;
  images? : AssetItemType;
  scripts? : AssetItemType;
  styles? : AssetItemType;
}

function getDestPaths(config: CleanConfig): {
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

export default function (config: CleanConfig): {
  scriptsStyles: TaskFunction;
  assets: TaskFunction;
  all: TaskFunction;
} {
  const dests = getDestPaths(config);

  function scriptsStyles(): Promise<string[]> {
    return del(
      [
        dests.scripts || '',
        dests.styles || '',
      ], {
        force: true,
      },
    );
  }

  function assets(): Promise<string[]> {
    const assetsArray = typeof dests.assets === 'string' ? [dests.assets] : dests.assets;

    return del(
      [
        ...assetsArray,
        dests.favicon || '',
        dests.fonts || '',
        dests.icons || '',
        dests.images || '',
      ], {
        force: true,
      },
    );
  }
  // 'no-restricted-syntax': 'off',

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
