"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getManifestString = void 0;
const getManifestString = (manifestProps) => JSON.stringify(getManifestJson(manifestProps), null, 2);
exports.getManifestString = getManifestString;
const getManifestJson = (manifestProps) => {
    const icons = [
        ...(manifestProps.disableDefaultIcons
            ? []
            : [
                getIconSrc(manifestProps, 192),
                getIconSrc(manifestProps, 512),
            ]),
        ...extractIconsFromManifestProperties(manifestProps),
    ];
    return {
        background_color: '#ffffff',
        theme_color: '#ffffff',
        ...manifestProps,
        icons,
    };
};
const getIconSrc = (manifestProps, size) => {
    const url = (manifestProps.iconsUrl || '').replace(/\/+$/, '');
    return {
        src: `${url}/icon-${size}.png`,
        sizes: `${size}x${size}`,
        type: 'image/png',
    };
};
const extractIconsFromManifestProperties = (manifestProps) => manifestProps.icons || [];
