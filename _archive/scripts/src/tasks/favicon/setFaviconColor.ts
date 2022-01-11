import { TaskFunction, src } from 'gulp';

import { Favicon } from '../../classes/favicon';

/**
 * Cache configured color in Favicon
 * @param color HEX color string, for example "#ffffff"
 * @param favicon
 */
export function setFaviconColorTask(
  color: string = '',
  favicon: Favicon,
): TaskFunction {
  return () => setFaviconColorStream(color, favicon);
}

export function setFaviconColorStream(
  color: string = '',
  favicon: Favicon,
): NodeJS.ReadWriteStream {
  favicon.setColor(color);
  return src('.', { allowEmpty: true });
}
