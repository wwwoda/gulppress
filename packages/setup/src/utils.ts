const fs = require('fs');
const path = require('path');

let isYarnCache: boolean | null = null;

function getTargetFilePath(source: string, target: string): string {
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      return path.join(target, path.basename(source));
    }
  }

  return target;
}
export function copyFileSync(source: string, target: string): void {
  fs.writeFileSync(getTargetFilePath(source, target), fs.readFileSync(source));
}

/**
 * Resolve `cwd`, a.k.a, current working directory or context from user input.
 * It takes into account the `--context [path]` option from CLI and uses process
 * cwd, if not provided.
 *
 * @param options Options as received from CLI
 */
export function resolveCWD(
  options: { context?: string | undefined } | undefined,
): string {
  let cwd = process.cwd();
  // If user has provided cwd, then use that instead
  if (options && options.context) {
    const { context } = options;
    if (path.isAbsolute(options.context)) {
      cwd = context;
    } else {
      cwd = path.resolve(cwd, context);
    }
  }

  return cwd;
}

export function isYarn(): boolean {
  const cwd = process.cwd();
  if (isYarnCache !== null) {
    return isYarnCache;
  }
  try {
    isYarnCache = findUp.sync('yarn.lock', { cwd }) != null;

    return isYarnCache;
  } catch (_) {
    isYarnCache = false;

    return isYarnCache;
  }
}
