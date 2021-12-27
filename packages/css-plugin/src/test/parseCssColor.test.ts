import {parseCssColor} from '../main/parseCssColor';
import '@paint-bucket/rgb-plugin';

describe('parseCssColor', () => {

  test('parses HEX', () => {
    expect(parseCssColor('abc')?.toRgbInt()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('a1b2c3')?.toRgbInt()).toBe(0xA1_B2_C3_FF);
    expect(parseCssColor('#abc')?.toRgbInt()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('#a1b2c3')?.toRgbInt()).toBe(0xA1_B2_C3_FF);
    expect(parseCssColor('  abc  ')?.toRgbInt()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('  a1b2c3  ')?.toRgbInt()).toBe(0xA1_B2_C3_FF);
    expect(parseCssColor('  #abc  ')?.toRgbInt()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('  #a1b2c3  ')?.toRgbInt()).toBe(0xA1_B2_C3_FF);
  });

  test('parses HEX with alpha channel', () => {
    expect(parseCssColor('abcd')?.toRgbInt()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('a1b2c3d4')?.toRgbInt()).toBe(0xA1_B2_C3_D4);
    expect(parseCssColor('#abcd')?.toRgbInt()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('#a1b2c3d4')?.toRgbInt()).toBe(0xA1_B2_C3_D4);
    expect(parseCssColor('  abcd  ')?.toRgbInt()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('  a1b2c3d4  ')?.toRgbInt()).toBe(0xA1_B2_C3_D4);
    expect(parseCssColor('  #abcd  ')?.toRgbInt()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('  #a1b2c3d4  ')?.toRgbInt()).toBe(0xA1_B2_C3_D4);
  });

  test('parses RGB', () => {
    expect(parseCssColor('rgb(170,187,204)')?.toRgbInt()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb(170 187 204)')?.toRgbInt()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb 170 187 204')?.toRgbInt()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb ( 170 187 204 )')?.toRgbInt()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb ( 170 73.33% 204 )')?.toRgbInt()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb ( 66.66% 73.33% 80.00% )')?.toRgbInt()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb 67% 73% 80%')?.toRgbInt()).toBe(0xAB_BA_CC_FF);
  });

  test('parses RGB with alpha channel', () => {
    expect(parseCssColor('rgb(170,187,204,0.866)')?.toRgbInt()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('rgb(170,187,204/0.866)')?.toRgbInt()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('rgb(170,187,204 / 0.866)')?.toRgbInt()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('  rgb 170,187,204,86.6%  ')?.toRgbInt()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('  rgb 66.66% 73.33% 80%/0.866  ')?.toRgbInt()).toBe(0xAA_BB_CC_DD);
  });
});
