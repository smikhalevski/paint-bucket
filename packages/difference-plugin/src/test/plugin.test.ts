import {color} from '@paint-bucket/core';
import '@paint-bucket/rgb-plugin';
import '../main';

describe('plugin', () => {

  test('returns delta E2000', () => {
    expect(color(0xFF_FF_FF_FF).deltaE2000(color(0xFF_FF_FF_FF))).toBe(0);
    expect(color(0xAA_BB_CC_FF).deltaE2000(color(0x00_FF_00_FF))).toBeCloseTo(42.8567);
  });

  test('returns JND status', () => {
    expect(color(0xFF_FF_FF_FF).isJnd(color(0xFF_FE_FF_FF))).toBe(true);
    expect(color(0xAA_BB_CC_FF).isJnd(color(0x00_FF_00_FF))).toBe(false);
  });
});
