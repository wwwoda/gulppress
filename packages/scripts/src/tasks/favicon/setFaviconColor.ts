import { Favicon } from '../../classes/favicon';

/**
 * Cache configured color in Favicon
 * @param color HEX color string, for example "#ffffff"
 * @param favicon
 */
export function getSetFaviconColorTask(
  color: string = '',
  favicon: Favicon,
) {
  return (cb: CallableFunction): NodeJS.ReadWriteStream => {
    favicon.setColor(color);
    return cb();
  };
}
