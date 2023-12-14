import { RGB } from '../../rgb';
import { CMYK } from './cmyk';

const { min } = Math;

/**
 * Convert RGBa to CMYKa.
 */
export function convertRGBToCMYK(rgb: RGB, cmyk: CMYK): CMYK {
  const [R, G, B] = rgb;

  const K = min(1 - R, 1 - G, 1 - B);

  if (K === 1) {
    cmyk[0] = cmyk[1] = cmyk[2] = 0;
  } else {
    cmyk[0] = (1 - R - K) / (1 - K);
    cmyk[1] = (1 - G - K) / (1 - K);
    cmyk[2] = (1 - B - K) / (1 - K);
  }

  cmyk[3] = K;
  cmyk[4] = rgb[3];

  return cmyk;
}

/**
 * Convert CMYKa to RGBa.
 */
export function convertCMYKToRGB(cmyk: CMYK, rgb: RGB): RGB {
  const K = cmyk[3];

  rgb[0] = 1 - min(1, cmyk[0] * (1 - K) + K);
  rgb[1] = 1 - min(1, cmyk[1] * (1 - K) + K);
  rgb[2] = 1 - min(1, cmyk[2] * (1 - K) + K);
  rgb[3] = cmyk[4];

  return rgb;
}
