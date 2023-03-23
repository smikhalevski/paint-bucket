import { convertLABToXYZ, convertXYZToLAB } from './lab-xyz';
import { convertRGBToXYZ, WhitePoint, XYZ, convertXYZToRGB } from '@paint-bucket/xyz';
import { RGB } from '@paint-bucket/core';
import { LAB } from './lab';

const tempXYZ: XYZ = [0, 0, 0, 1];

export function convertRGBToLAB(rgb: RGB, lab: LAB, whitePoint = WhitePoint.deg2.D65): LAB {
  return convertXYZToLAB(convertRGBToXYZ(rgb, tempXYZ, whitePoint), lab, whitePoint);
}

export function convertLABToRGB(lab: LAB, rgb: RGB, whitePoint = WhitePoint.deg2.D65): RGB {
  return convertXYZToRGB(convertLABToXYZ(lab, tempXYZ, whitePoint), rgb, whitePoint);
}
