import {rgb} from '../../main/color-spaces/rgb';

describe('rgb', () => {

  test('creates RGB color', () => {
    expect(rgb(18, 52, 86)).toBe(0x12_34_56_FF_00);
  });

  test('creates RGB color with alpha', () => {
    expect(rgb(18, 52, 86, .5)).toBe(0x12_34_56_7F_00);
  });

  test('clamps bytes', () => {
    expect(rgb(400, 52, 300, 100)).toBe(0xFF_34_FF_FF_00);
  });
});
