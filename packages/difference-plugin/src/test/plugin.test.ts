import {color} from '@paint-bucket/core';
import '@paint-bucket/rgb-plugin';
import '../main';

describe('plugin', () => {

  test('returns delta E2000', () => {
    expect(color(0xFF_FF_FF).deltaE(0xFF_FF_FF)).toBe(0);
    expect(color(0xAA_BB_CC).deltaE(0x00_FF_00)).toBeCloseTo(42.8567);
  });
});
