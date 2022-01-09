import {parseCssColor} from '../main/parseCssColor';
import '@paint-bucket/rgb-plugin';

describe('parseCssColor', () => {

  test('parses transparent color', () => {
    expect(parseCssColor('transparent')?.rgb32()).toBe(0x00_00_00_00);
    expect(parseCssColor('TRANSPARENT')?.rgb32()).toBe(0x00_00_00_00);
  });

  test('parses HEX', () => {
    expect(parseCssColor('abc')?.rgb32()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('a1b2c3')?.rgb32()).toBe(0xA1_B2_C3_FF);
    expect(parseCssColor('#abc')?.rgb32()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('#a1b2c3')?.rgb32()).toBe(0xA1_B2_C3_FF);
    expect(parseCssColor('  abc  ')?.rgb32()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('  a1b2c3  ')?.rgb32()).toBe(0xA1_B2_C3_FF);
    expect(parseCssColor('  #abc  ')?.rgb32()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('  #a1b2c3  ')?.rgb32()).toBe(0xA1_B2_C3_FF);
  });

  test('parses HEX with alpha channel', () => {
    expect(parseCssColor('abcd')?.rgb32()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('a1b2c3d4')?.rgb32()).toBe(0xA1_B2_C3_D4);
    expect(parseCssColor('#abcd')?.rgb32()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('#a1b2c3d4')?.rgb32()).toBe(0xA1_B2_C3_D4);
    expect(parseCssColor('  abcd  ')?.rgb32()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('  a1b2c3d4  ')?.rgb32()).toBe(0xA1_B2_C3_D4);
    expect(parseCssColor('  #abcd  ')?.rgb32()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('  #a1b2c3d4  ')?.rgb32()).toBe(0xA1_B2_C3_D4);
  });

  test('parses RGB', () => {
    expect(parseCssColor('rgb(170,187,204)')?.rgb32()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb(170 187 204)')?.rgb32()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb 170 187 204')?.rgb32()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb ( 170 187 204 )')?.rgb32()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb ( 170 73.5% 204 )')?.rgb32()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb ( 66.8% 73.5% 80% )')?.rgb32()).toBe(0xAA_BB_CC_FF);
    expect(parseCssColor('rgb 67% 73% 80%')?.rgb32()).toBe(0xAB_BA_CC_FF);
  });

  test('parses RGB with alpha channel', () => {
    expect(parseCssColor('rgb(170,187,204,0.866)')?.rgb32()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('rgb(170,187,204/0.866)')?.rgb32()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('rgb(170,187,204 / 0.866)')?.rgb32()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('  rgb 170,187,204,86.6%  ')?.rgb32()).toBe(0xAA_BB_CC_DD);
    expect(parseCssColor('  rgb 66.66% 73.33% 80%/0.866  ')?.rgb32()).toBe(0xAA_BB_CC_DD);
  });

  test('parses HSL', () => {
    expect(parseCssColor('hsl(100, 100%, 50%)')?.rgb32()).toBe(0x55_FF_00_FF);
  });
});
