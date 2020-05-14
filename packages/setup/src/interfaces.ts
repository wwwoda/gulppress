export type Feature = 'typescript' | 'eslint' | 'stylelint';

export type DistStructure = 'assets' | 'dist' | 'root';

export type SrcStructure = 'assets' | 'src';

export type Task = 'styles' | 'browserSync' | 'favicon' | 'fonts' | 'icons' | 'images' | 'translation' | 'vendorScripts';

export type Type = 'theme' | 'plugin' | 'bedrock';
export interface Pkg {
  name: string;
  description: string;
  version: string;
  scripts: IndexedObject;
  keywords: string[];
  author: string | { name: string; email: string; url: string };
  license: string;
  homepage: string;
  dependencies: IndexedObject;
  devDependencies: { [index:string] : string };
}

export interface ProjectConfig {
  distStructurePath: string;
  domain: string;
  environment: string | null;
  srcStructurePath: string;
  basePath: string;
  basePathClean: string;
  createSeparateMinFiles: boolean;
  distStructure: DistStructure;
  dotEnv: boolean;
  dotEnvPath: string;
  features: Feature[];
  projectName: string;
  projectURL: string;
  srcStructure: SrcStructure;
  tasks: Task[]
  type: Type;
}

export interface ProjectDependencies {
  dependencies?: string[];
  devDependencies?: string[];
}

export interface IndexedObject { [index:string] : string }
