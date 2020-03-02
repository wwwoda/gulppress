import findUp from 'find-up';
import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { ProjectConfig } from './interfaces';

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

export function installWithYarn(config: ProjectConfig | undefined): boolean {
  if (typeof config !== 'undefined') {
    return config.useYarn || isYarn();
  }
  return isYarn();
}

export function getFileContent(filePath: string): string {
  return fs
    .readFileSync(
      path.resolve(
        __dirname,
        filePath,
      ),
    )
    .toString();
}

export function fileExists(filePath: string): boolean {
  try {
    return fs.statSync(filePath).isFile();
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }
}

export function directoryExists(directoryPath: string): boolean {
  try {
    return fs.statSync(directoryPath).isDirectory();
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    }

    throw error;
  }
}

export function getDirectories(source: string): string[] {
  return fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

export function compileAndWriteHandlebarsTemplate(
  source: string,
  target: string,
  config?: ProjectConfig,
) {
  const templateContent = getFileContent(source);
  const compiler = handlebars.compile(templateContent);
  fs.writeFileSync(target, compiler(config));
}
