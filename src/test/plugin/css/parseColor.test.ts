import { describe, test, expect } from 'vitest';
import { Color } from '../../../main/core.js';
import { parseColor } from '../../../main/plugin/css/parseColor.js';
import '../../../main/plugin/rgb';

describe('parseColor', () => {
  test('parses transparent color', () => {
    expect(parseColor('transparent', new Color())?.rgb32()).toBe(0x00_00_00_00);
    expect(parseColor('TRANSPARENT', new Color())?.rgb32()).toBe(0x00_00_00_00);
  });

  test('parses HEX', () => {
    expect(parseColor('abc', new Color())?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('a1b2c3', new Color())?.rgb32()).toBe(0xa1_b2_c3_ff);
    expect(parseColor('#abc', new Color())?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('#a1b2c3', new Color())?.rgb32()).toBe(0xa1_b2_c3_ff);
    expect(parseColor('  abc  ', new Color())?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('  a1b2c3  ', new Color())?.rgb32()).toBe(0xa1_b2_c3_ff);
    expect(parseColor('  #abc  ', new Color())?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('  #a1b2c3  ', new Color())?.rgb32()).toBe(0xa1_b2_c3_ff);
  });

  test('parses HEX with alpha channel', () => {
    expect(parseColor('abcd', new Color())?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('a1b2c3d4', new Color())?.rgb32()).toBe(0xa1_b2_c3_d4);
    expect(parseColor('#abcd', new Color())?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('#a1b2c3d4', new Color())?.rgb32()).toBe(0xa1_b2_c3_d4);
    expect(parseColor('  abcd  ', new Color())?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('  a1b2c3d4  ', new Color())?.rgb32()).toBe(0xa1_b2_c3_d4);
    expect(parseColor('  #abcd  ', new Color())?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('  #a1b2c3d4  ', new Color())?.rgb32()).toBe(0xa1_b2_c3_d4);
  });

  test('parses RGB', () => {
    expect(parseColor('rgb(170,187,204)', new Color())?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb(170 187 204)', new Color())?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb 170 187 204', new Color())?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb ( 170 187 204 )', new Color())?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb ( 170 73.5% 204 )', new Color())?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb ( 66.8% 73.5% 80% )', new Color())?.rgb32()).toBe(0xaa_bb_cc_ff);
    expect(parseColor('rgb 67% 73% 80%', new Color())?.rgb32()).toBe(0xab_ba_cc_ff);
  });

  test('parses RGB with alpha channel', () => {
    expect(parseColor('rgb(170,187,204,0.866)', new Color())?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('rgb(170,187,204/0.866)', new Color())?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('rgb(170,187,204 / 0.866)', new Color())?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('  rgb 170,187,204,86.6%  ', new Color())?.rgb32()).toBe(0xaa_bb_cc_dd);
    expect(parseColor('  rgb 66.66% 73.33% 80%/0.866  ', new Color())?.rgb32()).toBe(0xaa_bb_cc_dd);
  });

  test('parses HSL', () => {
    expect(parseColor('hsl(100, 100%, 50%)', new Color())?.rgb32()).toBe(0x55_ff_00_ff);
  });
});
