import {parseCssColor} from '../main/parseCssColor';

describe('parseCssColor', () => {

  test('parses HEX', () => {
    expect(parseCssColor('abc')).toBe(0xAA_BB_CC_FF_0);
    expect(parseCssColor('a1b2c3')).toBe(0xA1_B2_C3_FF_0);
    expect(parseCssColor('#abc')).toBe(0xAA_BB_CC_FF_0);
    expect(parseCssColor('#a1b2c3')).toBe(0xA1_B2_C3_FF_0);
    expect(parseCssColor('  abc  ')).toBe(0xAA_BB_CC_FF_0);
    expect(parseCssColor('  a1b2c3  ')).toBe(0xA1_B2_C3_FF_0);
    expect(parseCssColor('  #abc  ')).toBe(0xAA_BB_CC_FF_0);
    expect(parseCssColor('  #a1b2c3  ')).toBe(0xA1_B2_C3_FF_0);
  });

  test('parses HEX with alpha channel', () => {
    expect(parseCssColor('abcd')).toBe(0xAA_BB_CC_DD_0);
    expect(parseCssColor('a1b2c3d4')).toBe(0xA1_B2_C3_D4_0);
    expect(parseCssColor('#abcd')).toBe(0xAA_BB_CC_DD_0);
    expect(parseCssColor('#a1b2c3d4')).toBe(0xA1_B2_C3_D4_0);
    expect(parseCssColor('  abcd  ')).toBe(0xAA_BB_CC_DD_0);
    expect(parseCssColor('  a1b2c3d4  ')).toBe(0xA1_B2_C3_D4_0);
    expect(parseCssColor('  #abcd  ')).toBe(0xAA_BB_CC_DD_0);
    expect(parseCssColor('  #a1b2c3d4  ')).toBe(0xA1_B2_C3_D4_0);
  });

  test('parses RGB', () => {
    expect(parseCssColor('rgb(170,187,204)')).toBe(0xAA_BB_CC_FF_0);
    expect(parseCssColor('rgb(170 187 204)')).toBe(0xAA_BB_CC_FF_0);
    expect(parseCssColor('rgb 170 187 204')).toBe(0xAA_BB_CC_FF_0);
    expect(parseCssColor('rgb ( 170 187 204 )')).toBe(0xAA_BB_CC_FF_0);
    expect(parseCssColor('rgb ( 170 73.33% 204 )')).toBe(0xAA_BB_CC_FF_0);
    expect(parseCssColor('rgb ( 66.66% 73.33% 80.00% )')).toBe(0xAA_BB_CC_FF_0);
    expect(parseCssColor('rgb 67% 73% 80%')).toBe(0xAB_BA_CC_FF_0);
  });

  test('parses RGB with alpha channel', () => {
    expect(parseCssColor('rgb(170,187,204,0.866)')).toBe(0xAA_BB_CC_DD_0);
    expect(parseCssColor('rgb(170,187,204/0.866)')).toBe(0xAA_BB_CC_DD_0);
    expect(parseCssColor('rgb(170,187,204 / 0.866)')).toBe(0xAA_BB_CC_DD_0);
    expect(parseCssColor('  rgb 170,187,204,86.6%  ')).toBe(0xAA_BB_CC_DD_0);
    expect(parseCssColor('  rgb 66.66% 73.33% 80%/0.866  ')).toBe(0xAA_BB_CC_DD_0);
  });
});
