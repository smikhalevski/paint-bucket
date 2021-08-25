import {IRgb} from './color-types';
import {rgb, tempRgb} from './color-utils';
import {sqrt} from './math-utils';

export type RgbAt = (x: number, y: number, outRgb?: IRgb) => IRgb;

export function toRgbAt(uint8Array: Uint8ClampedArray, width: number, alphaEnabled: boolean): RgbAt {
  const channelCount = alphaEnabled ? 4 : 3;

  return (x, y, outRgb = rgb(0, 0, 0)) => {
    const k = (y * width + x) * channelCount;

    if (k < uint8Array.length) {

      outRgb.r = uint8Array[k];
      outRgb.g = uint8Array[k + 1];
      outRgb.b = uint8Array[k + 2];
      outRgb.alpha = alphaEnabled ? uint8Array[k + 3] : 1;

      return outRgb;
    }

    outRgb.r = 0;
    outRgb.g = 0;
    outRgb.b = 0;
    outRgb.alpha = 1;

    return outRgb;
  };
}

export function averageRgb(rgbAt: RgbAt, x: number, y: number, width: number, height: number, outRgb = rgb(0, 0, 0)): IRgb {

  let sqR = 0;
  let sqG = 0;
  let sqB = 0;
  let sqAlpha = 0;

  for (let i = x; i < x + width; ++i) {
    for (let j = y; j < y + height; ++j) {
      const {r, g, b, alpha} = rgbAt(i, j, tempRgb);

      sqR += r * r;
      sqG += g * g;
      sqB += b * b;
      sqAlpha += alpha * alpha;
    }
  }

  const n = width * height;

  outRgb.r = sqrt(sqR / n);
  outRgb.g = sqrt(sqG / n);
  outRgb.b = sqrt(sqB / n);
  outRgb.alpha = sqrt(sqAlpha / n);

  return outRgb;
}
