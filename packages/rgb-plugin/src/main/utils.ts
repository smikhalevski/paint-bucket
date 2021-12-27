import {IRgb} from '@paint-bucket/core';

export function getLuminance(rgb: IRgb): number {
  const {R, G, B} = rgb;

  return getChannelLuminance(R) * 0.2126 + getChannelLuminance(G) * 0.7152 + getChannelLuminance(B) * 0.0722;
}

function getChannelLuminance(v: number): number {
  return v > 0.03928 ? Math.pow(((v + 0.055) / 1.055), 2.4) : v / 12.92;
}
