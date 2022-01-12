"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = void 0;
const setup = async () => {
    const cwd = resolveCWD({});
    const initiator = new Setup(cwd);
    try {
        const done = await initiator.startSetup();
        const useYarn = installWithYarn(done.projectConfig);
        const command = useYarn ? 'yarn' : 'npm';
        const add = useYarn ? 'add' : 'i';
        const devParam = useYarn ? '--dev' : '-D';
        const spinner = ora({ spinner: 'dots3', discardStdin: false });
        if (done && done.devDependencies.length) {
            spinner.start('installing dev dependencies may take a while');
            try {
                await execa(command, [
                    add,
                    ...done.devDependencies,
                    devParam,
                ]);
                spinner.succeed('done installing dev dependencies\n');
            }
            catch (error) {
                spinner.fail('could not install all dev dependencies');
                console.log(error);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
    console.log('done');
};
exports.setup = setup;
