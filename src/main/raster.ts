import {pow2, sqrt} from './math';
import {ColorSpace, fromRawBytes, getColorByte, getColorSpace, NakedColor} from './bytes';

export type ColorAt = (x: number, y: number) => NakedColor;

export function toColorAt(colorSpace: ColorSpace, raster: Uint8ClampedArray, width: number): ColorAt {
  return (x, y) => {
    const k = (y * width + x) * 4;

    if (k < raster.length) {
      return fromRawBytes(colorSpace, raster[k], raster[k + 1], raster[k + 2], raster[k + 3]);
    }

    return fromRawBytes(colorSpace, 0, 0, 0, 0xFF);
  };
}

export function averageColor(colorAt: ColorAt, x: number, y: number, width: number, height: number): NakedColor {

  let sq0 = 0;
  let sq1 = 0;
  let sq2 = 0;
  let sq3 = 0;

  const w = x + width;
  const h = y + height;

  for (let i = x; i < w; ++i) {
    for (let j = y; j < h; ++j) {

      const color = colorAt(i, j);

      sq0 += pow2(getColorByte(color, 0));
      sq1 += pow2(getColorByte(color, 1));
      sq2 += pow2(getColorByte(color, 2));
      sq3 += pow2(getColorByte(color, 3));
    }
  }

  const n = width * height;

  return fromRawBytes(
      getColorSpace(colorAt(x, y)),
      sqrt(sq0 / n),
      sqrt(sq1 / n),
      sqrt(sq2 / n),
      sqrt(sq3 / n),
  );
}
