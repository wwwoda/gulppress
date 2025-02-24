"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManifestString = void 0;
const getManifestString = (manifestProps, path) => JSON.stringify(getManifestJson(manifestProps, path), null, 2);
exports.getManifestString = getManifestString;
const getManifestJson = (manifestProps, path) => ({
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
        getIconSrc(path, 192),
        getIconSrc(path, 512),
    ],
    ...manifestProps,
});
const getIconSrc = (path, size) => ({
    src: `${path.replace(/\/+$/, '')}/icon-${size}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png',
});
