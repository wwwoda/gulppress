"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManifestString = void 0;
const getManifestString = (manifestProps) => JSON.stringify(getManifestJson(manifestProps), null, 2);
exports.getManifestString = getManifestString;
const getManifestJson = (manifestProps) => {
    const icons = [
        {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
        },
        {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
        },
        ...extractIconsFromManifestProperties(manifestProps),
    ];
    return {
        background_color: '#ffffff',
        theme_color: '#ffffff',
        ...manifestProps,
        icons,
    };
};
const extractIconsFromManifestProperties = (manifestProps) => manifestProps.icons || [];
