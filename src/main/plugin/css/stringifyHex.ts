import { Color } from '../../Color.js';
import { RGB } from '../../rgb.js';
import { convertComponentsToColorInt32 } from '../../utils.js';

const HEX_MASK = '00000000';

export function stringifyHex(color: Color): string {
  const components = color.getComponents(RGB);

  let bits = convertComponentsToColorInt32(components);
  let size = 8;

  if (components[3] === 1) {
    // Alpha channel can be discarded
    bits = bits >>> 8;
    size = 6;
  }

  const hex = bits.toString(16);

  return '#' + HEX_MASK.substring(0, size - hex.length) + hex;
}
