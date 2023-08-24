import { RGB } from '../../core';
import { convertRGBToXYZ, convertXYZToRGB, WhitePoint, XYZ } from '../xyz';
import { LAB } from './lab';
import { convertLABToXYZ, convertXYZToLAB } from './lab-xyz';

const tempXYZ: XYZ = [0, 0, 0, 1];

/**
 * Convert RGBa to CIELAB.
 */
export function convertRGBToLAB(rgb: RGB, lab: LAB, whitePoint = WhitePoint.CIE1931.D65): LAB {
  return convertXYZToLAB(convertRGBToXYZ(rgb, tempXYZ, whitePoint), lab, whitePoint);
}

/**
 * Convert CIELAB to RGBa.
 */
export function convertLABToRGB(lab: LAB, rgb: RGB, whitePoint = WhitePoint.CIE1931.D65): RGB {
  return convertXYZToRGB(convertLABToXYZ(lab, tempXYZ, whitePoint), rgb, whitePoint);
}
