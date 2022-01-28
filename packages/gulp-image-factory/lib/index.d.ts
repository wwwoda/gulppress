import type { Transform } from 'stream';
import type { ImageFactoryConfigs, ImageFactoryOptions } from './types';
export * from './types';
declare const _default: (configs: ImageFactoryConfigs, customOptions?: ImageFactoryOptions | undefined) => Transform;
export default _default;
