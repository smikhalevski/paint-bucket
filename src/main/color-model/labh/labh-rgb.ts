import { RGB } from '../../rgb.js';
import { convertRGBToXYZ, convertXYZToRGB, WhitePoint, XYZ } from '../xyz/index.js';
import { LABh } from './labh.js';
import { convertLABhToXYZ, convertXYZToLABh } from './labh-xyz.js';

const tempXYZ: XYZ = [0, 0, 0, 1];

/**
 * Convert RGBa to Hunter L, a, b.
 */
export function convertRGBToLABh(rgb: RGB, lab: LABh, whitePoint = WhitePoint.CIE1931.D65): LABh {
  return convertXYZToLABh(convertRGBToXYZ(rgb, tempXYZ, whitePoint), lab);
}

/**
 * Convert Hunter L, a, b to RGBa.
 */
export function convertLABhToRGB(lab: LABh, rgb: RGB, whitePoint = WhitePoint.CIE1931.D65): RGB {
  return convertXYZToRGB(convertLABhToXYZ(lab, tempXYZ), rgb, whitePoint);
}
