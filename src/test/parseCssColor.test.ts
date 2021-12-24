import {parseColor} from '../main/parseColor';

describe('parseColor', () => {

  test('parses HEX', () => {
    expect(parseColor('abc')).toBe(0xAA_BB_CC_FF_0);
    expect(parseColor('a1b2c3')).toBe(0xA1_B2_C3_FF_0);
    expect(parseColor('#abc')).toBe(0xAA_BB_CC_FF_0);
    expect(parseColor('#a1b2c3')).toBe(0xA1_B2_C3_FF_0);
    expect(parseColor('  abc  ')).toBe(0xAA_BB_CC_FF_0);
    expect(parseColor('  a1b2c3  ')).toBe(0xA1_B2_C3_FF_0);
    expect(parseColor('  #abc  ')).toBe(0xAA_BB_CC_FF_0);
    expect(parseColor('  #a1b2c3  ')).toBe(0xA1_B2_C3_FF_0);
  });

  test('parses HEX with alpha channel', () => {
    expect(parseColor('abcd')).toBe(0xAA_BB_CC_DD_0);
    expect(parseColor('a1b2c3d4')).toBe(0xA1_B2_C3_D4_0);
    expect(parseColor('#abcd')).toBe(0xAA_BB_CC_DD_0);
    expect(parseColor('#a1b2c3d4')).toBe(0xA1_B2_C3_D4_0);
    expect(parseColor('  abcd  ')).toBe(0xAA_BB_CC_DD_0);
    expect(parseColor('  a1b2c3d4  ')).toBe(0xA1_B2_C3_D4_0);
    expect(parseColor('  #abcd  ')).toBe(0xAA_BB_CC_DD_0);
    expect(parseColor('  #a1b2c3d4  ')).toBe(0xA1_B2_C3_D4_0);
  });

  test('parses RGB', () => {
    expect(parseColor('rgb(170,187,204)')).toBe(0xAA_BB_CC_FF_0);
    expect(parseColor('rgb(170 187 204)')).toBe(0xAA_BB_CC_FF_0);
    expect(parseColor('rgb 170 187 204')).toBe(0xAA_BB_CC_FF_0);
    expect(parseColor('rgb ( 170 187 204 )')).toBe(0xAA_BB_CC_FF_0);
    expect(parseColor('rgb ( 170 73.33% 204 )')).toBe(0xAA_BB_CC_FF_0);
    expect(parseColor('rgb ( 66.66% 73.33% 80.00% )')).toBe(0xAA_BB_CC_FF_0);
    expect(parseColor('rgb 67% 73% 80%')).toBe(0xAB_BA_CC_FF_0);
  });

  test('parses RGB with alpha channel', () => {
    expect(parseColor('rgb(170,187,204,0.866)')).toBe(0xAA_BB_CC_DD_0);
    expect(parseColor('rgb(170,187,204/0.866)')).toBe(0xAA_BB_CC_DD_0);
    expect(parseColor('rgb(170,187,204 / 0.866)')).toBe(0xAA_BB_CC_DD_0);
    expect(parseColor('  rgb 170,187,204,86.6%  ')).toBe(0xAA_BB_CC_DD_0);
    expect(parseColor('  rgb 66.66% 73.33% 80%/0.866  ')).toBe(0xAA_BB_CC_DD_0);
  });
});
