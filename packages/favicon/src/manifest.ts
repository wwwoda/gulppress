import type { ManifestProperties } from './types';

export const getManifestString = (
  manifestProps: ManifestProperties,
  path: string,
): string => JSON.stringify(getManifestJson(manifestProps, path), null, 2);

const getManifestJson = (
  manifestProps: ManifestProperties,
  path: string,
): ManifestProperties => ({
  background_color: '#ffffff',
  theme_color: '#ffffff',
  icons: [
    getIconSrc(path, 192),
    getIconSrc(path, 512),
  ],
  ...manifestProps,
});

const getIconSrc = (
  path: string,
  size: number,
) => ({
  src: `${path.replace(/\/+$/, '')}/icon-${size}.png`,
  sizes: `${size}x${size}`,
  type: 'image/png',
});
