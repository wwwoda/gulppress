import type { ManifestIcon, ManifestProperties } from '@gulppress/types';

export const getManifestString = (
  manifestProps: ManifestProperties,
): string => JSON.stringify(getManifestJson(manifestProps), null, 2);

const getManifestJson = (
  manifestProps: ManifestProperties,
): ManifestProperties => {
  const icons: ManifestIcon[] = [
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
  return { ...manifestProps, icons };
};

const extractIconsFromManifestProperties = (
  manifestProps: Partial<ManifestProperties>,
): ManifestIcon[] => manifestProps.icons || [];
