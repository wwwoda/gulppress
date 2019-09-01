/// <reference types="undertaker" />
import browserSync from 'browser-sync';

export default function (config: browserSync.Options): import("undertaker").TaskFunction;
