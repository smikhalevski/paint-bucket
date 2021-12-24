import {pow2, sqrt} from './math';
import {getColorByte, getColorSpace, unsafeComposeBytes} from './raw-color-utils';
import {ColorSpace, RawColor} from './colors';

export type RasterColorPicker = (x: number, y: number) => RawColor;

export function createRasterColorPicker(colorSpace: ColorSpace, raster: Uint8ClampedArray, width: number): RasterColorPicker {
  return (x, y) => {
    const k = (y * width + x) * 4;

    if (k < raster.length) {
      return unsafeComposeBytes(colorSpace, raster[k], raster[k + 1], raster[k + 2], raster[k + 3]);
    }

    return unsafeComposeBytes(colorSpace, 0, 0, 0, 0xFF);
  };
}

export function getAverageColor(colorPicker: RasterColorPicker, x: number, y: number, width: number, height: number): RawColor {

  let sq0 = 0;
  let sq1 = 0;
  let sq2 = 0;
  let sq3 = 0;

  const w = x + width;
  const h = y + height;

  for (let i = x; i < w; ++i) {
    for (let j = y; j < h; ++j) {

      const color = colorPicker(i, j);

      sq0 += pow2(getColorByte(color, 0));
      sq1 += pow2(getColorByte(color, 1));
      sq2 += pow2(getColorByte(color, 2));
      sq3 += pow2(getColorByte(color, 3));
    }
  }

  const n = width * height;

  return unsafeComposeBytes(
      getColorSpace(colorPicker(x, y)),
      sqrt(sq0 / n),
      sqrt(sq1 / n),
      sqrt(sq2 / n),
      sqrt(sq3 / n),
  );
}
