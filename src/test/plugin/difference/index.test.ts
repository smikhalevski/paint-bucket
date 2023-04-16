import { Color } from '../../../main/core';
import differencePlugin from '../../../main/plugin/difference';
import rgbPlugin from '../../../main/plugin/rgb';

rgbPlugin(Color);
differencePlugin(Color);

describe('deltaE', () => {
  test('returns color difference', () => {
    expect(Color.parse(0xff_ff_ff).deltaE(0xff_ff_ff)).toBe(0);
    expect(Color.parse(0xaa_bb_cc).deltaE(0x00_ff_00)).toBeCloseTo(42.8567);
  });
});
