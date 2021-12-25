import {IRgb} from '@paint-bucket/core';
import {IXyz} from './xyz';

export function rgbToXyz(rgb: IRgb, xyz: IXyz): IXyz {

  const r = rotateRgb(rgb.R / 0xFF);
  const g = rotateRgb(rgb.G / 0xFF);
  const b = rotateRgb(rgb.B / 0xFF);

  xyz.X = (r * 0.41246 + g * 0.35758 + b * 0.18044) * 100;
  xyz.Y = (r * 0.21267 + g * 0.71515 + b * 0.07218) * 100;
  xyz.Z = (r * 0.01933 + g * 0.11919 + b * 0.95030) * 100;
  xyz.a = rgb.a;

  return xyz;
}

function rotateRgb(q: number): number {
  return q > 0.04045 ? Math.pow((q + 0.055) / 1.055, 2.4) : q / 12.92;
}
