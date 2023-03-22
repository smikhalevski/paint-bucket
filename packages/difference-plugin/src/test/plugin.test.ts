import '@paint-bucket/rgb-plugin';
import '../main';
import { Color } from '@paint-bucket/core';

describe('plugin', () => {
  test('returns delta E2000', () => {
    expect(Color.parse(0xff_ff_ff).deltaE(0xff_ff_ff)).toBe(0);
    expect(Color.parse(0xaa_bb_cc).deltaE(0x00_ff_00)).toBeCloseTo(42.8567);
  });
});
