export interface Pkg {
  name: string;
  homepage?: string;
  author?: string | { name: string; email: string; url: string };
  license?: string;
  scripts?: {
    [x: string]: string;
  };
  dependencies?: {
    [x: string]: string;
  };
  devDependencies?: {
    [x: string]: string;
  };
}

export interface ProjectConfig {
  appName: string;
  type: string;
  basePath: string;
  projectURL: string;
  dotEnv: boolean;
  dotEnvPath: string;
  createSeparateMinFiles: boolean;
  useYarn: boolean;
}

export interface ProjectDependencies {
  dependencies: string[];
  devDependencies: string[];
}
