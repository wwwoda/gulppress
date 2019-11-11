import { TaskFunction } from 'gulp';
import gulpPress from '../interfaces';
export default function (config: gulpPress.MainConfig): {
    scriptsStyles: TaskFunction;
    assets: TaskFunction;
    all: TaskFunction;
};
