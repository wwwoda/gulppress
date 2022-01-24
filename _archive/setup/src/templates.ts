import handlebars from 'handlebars';
import path from 'path';

import {
  compileAndWriteHandlebarsTemplate,
} from './utils';

import {
  ProjectConfig,
} from './interfaces';

export class TemplatesHandler {
  private static cwd: string;

  private static projectConfig: ProjectConfig;

  private static filenames = {
    config: 'gulppress.config.ts',
    gitIgnore: '.gitignore',
    gulpFile: 'gulpfile.ts',
    localConfig: 'gulppress.local.config.ts',
    eslintIgnore: '.eslintignore',
    eslintConfig: '.eslintrc.js',
    stylelintConfig: '.stylelintrc.json',
    tsconfig: 'tsconfig.json',
  };

  private static templatesPath = '../templates';

  public static writeFiles(cwd: string, projectConfig: ProjectConfig): void {
    TemplatesHandler.cwd = cwd;
    TemplatesHandler.projectConfig = projectConfig;
    TemplatesHandler.registerHelpers();
    TemplatesHandler.compileAndWriteFiles();
  }

  private static registerHelpers(): void {
    const { projectConfig } = TemplatesHandler;

    handlebars.registerHelper('if_feature', TemplatesHandler.getregisterHelperArrayFunction(projectConfig.features));
    handlebars.registerHelper('if_task', TemplatesHandler.getregisterHelperArrayFunction(projectConfig.tasks));
    handlebars.registerHelper('if_type', TemplatesHandler.getregisterHelperTextFunction(projectConfig.type));
  }

  private static getregisterHelperTextFunction<T>(value: T): handlebars.HelperDelegate {
    // eslint-disable-next-line func-names
    return function (this: any, search: T, options: any): boolean {
      if (value === search) {
        return options.fn(this);
      }
      return options.inverse(this);
    };
  }

  private static getregisterHelperArrayFunction<T>(values: T[]): handlebars.HelperDelegate {
    // eslint-disable-next-line func-names
    return function (this: any, search: T, options: any): boolean {
      if (values.includes(search)) {
        return options.fn(this);
      }
      return options.inverse(this);
    };
  }

  private static compileAndWriteFiles(): void {
    const {
      cwd,
      filenames,
      projectConfig,
      templatesPath,
    } = TemplatesHandler;
    compileAndWriteHandlebarsTemplate(
      `${templatesPath}/${filenames.config}.hbs`,
      path.resolve(cwd, filenames.config),
      projectConfig,
    );

    compileAndWriteHandlebarsTemplate(
      `${templatesPath}/${filenames.localConfig}.hbs`,
      path.resolve(cwd, filenames.localConfig),
      projectConfig,
    );

    compileAndWriteHandlebarsTemplate(
      `${templatesPath}/${filenames.gulpFile}.hbs`,
      path.resolve(cwd, filenames.gulpFile),
    );

    // ESLint
    if (projectConfig.features.includes('eslint')) {
      compileAndWriteHandlebarsTemplate(
        `${templatesPath}/${filenames.eslintConfig}.hbs`,
        path.resolve(cwd, filenames.eslintConfig),
        projectConfig,
      );

      compileAndWriteHandlebarsTemplate(
        `${templatesPath}/${filenames.eslintIgnore}.hbs`,
        path.resolve(cwd, filenames.eslintIgnore),
        projectConfig,
      );
    }

    // Stylelint
    if (projectConfig.features.includes('stylelint')) {
      compileAndWriteHandlebarsTemplate(
        `${templatesPath}/${filenames.stylelintConfig}.hbs`,
        path.resolve(cwd, filenames.stylelintConfig),
      );
    }

    // TypeScript
    if (projectConfig.features.includes('typescript')) {
      compileAndWriteHandlebarsTemplate(
        `${templatesPath}/${filenames.tsconfig}.hbs`,
        path.resolve(cwd, filenames.tsconfig),
        projectConfig,
      );
    }
  }
}
