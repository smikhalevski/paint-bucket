import {composeChannels, getColorChannel} from './channel-utils';
import {IRgb} from './rgb';

export function intToRgb(color: number, rgb: IRgb): IRgb {
  rgb.R = getColorChannel(color, 0);
  rgb.G = getColorChannel(color, 1);
  rgb.B = getColorChannel(color, 2);
  rgb.a = getColorChannel(color, 3) / 0xFF;
  return rgb;
}

export function rgbToInt(rgb: IRgb): number {
  return composeChannels(rgb.R, rgb.G, rgb.B, 0xFF * rgb.a);
}
