import { Color } from '@paint-bucket/core';
import rgbPlugin from '@paint-bucket/rgb-plugin';
import { parseColor } from '../main/parseColor';

Color.applyPlugin(rgbPlugin);

describe('parseColor', () => {
  test('parses transparent color', () => {
    expect(parseColor('transparent')?.rgb32()).toBe(0x00_00_00_00);
    expect(parseColor('TRANSPARENT')?.rgb32()).toBe(0x00_00_00_00);
  });

  test('parses HEX', () => {
    expect(parseColor('abc')?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('a1b2c3')?.rgb32()).toBe(0xa1_b2_c3_ff);
    expect(parseColor('#abc')?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('#a1b2c3')?.rgb32()).toBe(0xa1_b2_c3_ff);
    expect(parseColor('  abc  ')?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('  a1b2c3  ')?.rgb32()).toBe(0xa1_b2_c3_ff);
    expect(parseColor('  #abc  ')?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('  #a1b2c3  ')?.rgb32()).toBe(0xa1_b2_c3_ff);
  });

  test('parses HEX with alpha channel', () => {
    expect(parseColor('abcd')?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('a1b2c3d4')?.rgb32()).toBe(0xa1_b2_c3_d4);
    expect(parseColor('#abcd')?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('#a1b2c3d4')?.rgb32()).toBe(0xa1_b2_c3_d4);
    expect(parseColor('  abcd  ')?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('  a1b2c3d4  ')?.rgb32()).toBe(0xa1_b2_c3_d4);
    expect(parseColor('  #abcd  ')?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('  #a1b2c3d4  ')?.rgb32()).toBe(0xa1_b2_c3_d4);
  });

  test('parses RGB', () => {
    expect(parseColor('rgb(170,187,204)')?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb(170 187 204)')?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb 170 187 204')?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb ( 170 187 204 )')?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb ( 170 73.5% 204 )')?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb ( 66.8% 73.5% 80% )')?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb 67% 73% 80%')?.rgb32()).toBe(0xab_ba_cc_ff);
  });

  test('parses RGB with alpha channel', () => {
    expect(parseColor('rgb(170,187,204,0.866)')?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('rgb(170,187,204/0.866)')?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('rgb(170,187,204 / 0.866)')?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('  rgb 170,187,204,86.6%  ')?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('  rgb 66.66% 73.33% 80%/0.866  ')?.rgb32()).toBe(0xaa_bb_cc_dd);
  });

  test('parses HSL', () => {
    expect(parseColor('hsl(100, 100%, 50%)')?.rgb32()).toBe(0x55_ff_00_ff);
  });
});
