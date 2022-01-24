"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageJson = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
require("./interfaces");
class PackageJson {
    static data;
    static fileNamePackageJson = 'package.json';
    static packageJsonPath;
    static tasks = {
        dev: 'npm run development',
        development: 'cross-env NODE_ENV=development gulp development',
        serve: 'npm run watch',
        watch: 'cross-env NODE_ENV=development gulp development --watch=scripts,styles',
        prod: 'npm run build',
        production: 'npm run build',
        build: 'cross-env NODE_ENV=production gulp build',
    };
    static init(cwd) {
        PackageJson.packageJsonPath = path_1.default.resolve(cwd, PackageJson.fileNamePackageJson);
        PackageJson.data = PackageJson.readPackageData();
        PackageJson.preparePackage();
        return PackageJson.data;
    }
    static setup(projectConfig) {
        PackageJson.addMissingTasks();
        if (!PackageJson.data.name) {
            PackageJson.data.name = projectConfig.projectName;
        }
        PackageJson.writePackageJsonFile();
        return PackageJson.data;
    }
    static readPackageData() {
        const { packageJsonPath, } = PackageJson;
        return (0, utils_1.fileExists)(packageJsonPath)
            // eslint-disable-next-line global-require
            ? require(packageJsonPath)
            : { name: '' };
    }
    static preparePackage() {
        const { data } = PackageJson;
        if (!data.scripts) {
            data.scripts = {};
        }
    }
    static addMissingTasks() {
        const { data, tasks, } = PackageJson;
        Object.keys(tasks).forEach(task => {
            if (data.scripts[task]
                && data.scripts[task] !== tasks[task]) {
                PackageJson.data.scripts[`${task}-backup`] = data.scripts[task];
                PackageJson.data.scripts[task] = tasks[task];
            }
            else {
                PackageJson.data.scripts[task] = tasks[task];
            }
        });
    }
    static writePackageJsonFile() {
        const { data, packageJsonPath, } = PackageJson;
        fs_1.default.writeFileSync(packageJsonPath, JSON.stringify(data, null, 2));
    }
}
exports.PackageJson = PackageJson;
