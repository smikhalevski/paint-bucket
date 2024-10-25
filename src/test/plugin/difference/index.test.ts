import { Color } from '../../../main/core';
import '../../../main/plugin/difference';
import '../../../main/plugin/rgb';

describe('deltaE', () => {
  test('returns color difference', () => {
    expect(Color.parse(0xff_ff_ff).deltaE(0xff_ff_ff)).toBe(0);
    expect(Color.parse(0xaa_bb_cc).deltaE(0x00_ff_00)).toBeCloseTo(42.8567);
  });
});
