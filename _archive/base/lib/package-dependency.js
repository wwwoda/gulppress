"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInstalled = void 0;
const isInstalled = async (name) => {
    try {
        require.resolve(name);
        return true;
    }
    catch (e) {
        return false;
    }
};
exports.isInstalled = isInstalled;
