import type { ManifestIcon, ManifestProperties } from './types';

export const getManifestString = (
  manifestProps: ManifestProperties,
): string => JSON.stringify(getManifestJson(manifestProps), null, 2);

const getManifestJson = (
  manifestProps: ManifestProperties,
): ManifestProperties => {
  const icons: ManifestIcon[] = [
    ...(manifestProps.disableDefaultIcons
      ? []
      : [
        getIconSrc(manifestProps, 192),
        getIconSrc(manifestProps, 512),
      ]
    ),
    ...extractIconsFromManifestProperties(manifestProps),
  ];
  return {
    background_color: '#ffffff',
    theme_color: '#ffffff',
    ...manifestProps,
    icons,
  };
};

const getIconSrc = (
  manifestProps: ManifestProperties,
  size: number,
) => {
  const url = (manifestProps.iconsUrl || '').replace(/\/+$/, '');
  return {
    src: `${url}/icon-${size}.png`,
    sizes: `${size}x${size}`,
    type: 'image/png',
  };
};

const extractIconsFromManifestProperties = (
  manifestProps: Partial<ManifestProperties>,
): ManifestIcon[] => manifestProps.icons || [];
