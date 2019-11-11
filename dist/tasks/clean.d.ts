import { TaskFunction } from 'gulp';
import gulpress from '../interfaces';
export default function (config: gulpress.MainConfig): {
    scriptsStyles: TaskFunction;
    assets: TaskFunction;
    all: TaskFunction;
};
