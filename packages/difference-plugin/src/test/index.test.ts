import { Color } from '@paint-bucket/core';
import rgbPlugin from '@paint-bucket/rgb-plugin';
import differencePlugin from '../main';

Color.applyPlugins(rgbPlugin, differencePlugin);

describe('deltaE', () => {
  test('returns color difference', () => {
    expect(Color.parse(0xff_ff_ff).deltaE(0xff_ff_ff)).toBe(0);
    expect(Color.parse(0xaa_bb_cc).deltaE(0x00_ff_00)).toBeCloseTo(42.8567);
  });
});
