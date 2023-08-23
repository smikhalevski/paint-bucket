import {
  clamp,
  composeColorInt32,
  getColorInt32Component,
  normalizeColorInt,
  setColorInt32Component,
} from '../main/utils';

describe('clamp', () => {
  test('clamps value', () => {
    expect(clamp(NaN)).toBe(0);
    expect(clamp('aaa' as unknown as number)).toBe(0);
    expect(clamp('-1' as unknown as number)).toBe(0);
    expect(clamp('10' as unknown as number)).toBe(1);
    expect(clamp('10a' as unknown as number)).toBe(0);
    expect(clamp(-1)).toBe(0);
    expect(clamp(10)).toBe(1);
    expect(clamp(1.5)).toBe(1);
    expect(clamp(0.5)).toBe(0.5);
  });
});

describe('normalizeColorInt', () => {
  test('normalizes raw color bytes', () => {
    expect(normalizeColorInt(0x1, 1)).toBe(0x11_11_11_ff);
    expect(normalizeColorInt(0x12, 2)).toBe(0x12_12_12_ff);
    expect(normalizeColorInt(0x123, 3)).toBe(0x11_22_33_ff);
    expect(normalizeColorInt(0x1234, 4)).toBe(0x11_22_33_44);
    expect(normalizeColorInt(0x123456, 6)).toBe(0x12_34_56_ff);
    expect(normalizeColorInt(0x12345678, 8)).toBe(0x12_34_56_78);
  });

  test('returns black for invalid nibble count', () => {
    expect(normalizeColorInt(0x123, 0)).toBe(0);
    expect(normalizeColorInt(0x12345, 5)).toBe(0);
    expect(normalizeColorInt(0x1234567, 7)).toBe(0);
    expect(normalizeColorInt(0x123456789a, 10)).toBe(0);
  });
});

describe('composeColorInt', () => {
  test('assembles color from bytes', () => {
    expect(composeColorInt32(0x12, 0x34, 0x56, 0x78)).toBe(0x12345678);
  });

  test('clamps bytes', () => {
    expect(composeColorInt32(0x12, 0xaa_34, 0x56, 0xaa_78)).toBe(0x12345678);
  });
});

describe('getColorIntComponent', () => {
  test('gets the color byte', () => {
    const color = 0x12_34_56_aa;

    expect(getColorInt32Component(color, 0)).toBe(0x12);
    expect(getColorInt32Component(color, 1)).toBe(0x34);
    expect(getColorInt32Component(color, 2)).toBe(0x56);
    expect(getColorInt32Component(color, 3)).toBe(0xaa);
  });
});

describe('setColorIntComponent', () => {
  test('sets the color byte', () => {
    expect(setColorInt32Component(0x12_34_56_78, 0, 0xaa)).toBe(0xaa_34_56_78);
    expect(setColorInt32Component(0x12_34_56_78, 1, 0xaa)).toBe(0x12_aa_56_78);
    expect(setColorInt32Component(0x12_34_56_78, 2, 0xaa)).toBe(0x12_34_aa_78);
    expect(setColorInt32Component(0x12_34_56_78, 3, 0xaa)).toBe(0x12_34_56_aa);

    expect(setColorInt32Component(0x12_34_56_78, 0, 0xa)).toBe(0x0a_34_56_78);
    expect(setColorInt32Component(0x12_34_56_78, 1, 0xa)).toBe(0x12_0a_56_78);
    expect(setColorInt32Component(0x12_34_56_78, 2, 0xa)).toBe(0x12_34_0a_78);
    expect(setColorInt32Component(0x12_34_56_78, 3, 0xa)).toBe(0x12_34_56_0a);

    expect(setColorInt32Component(0x12_34_56_78, 0, 0xa0)).toBe(0xa0_34_56_78);
    expect(setColorInt32Component(0x12_34_56_78, 1, 0xa0)).toBe(0x12_a0_56_78);
    expect(setColorInt32Component(0x12_34_56_78, 2, 0xa0)).toBe(0x12_34_a0_78);
    expect(setColorInt32Component(0x12_34_56_78, 3, 0xa0)).toBe(0x12_34_56_a0);
  });

  test('prevents overflow', () => {
    expect(setColorInt32Component(0x12_34_56_78, 0, 0xaa_bb)).toBe(0xbb_34_56_78);
    expect(setColorInt32Component(0x12_34_56_78, 1, 0xaa_bb)).toBe(0x12_bb_56_78);
    expect(setColorInt32Component(0x12_34_56_78, 2, 0xaa_bb)).toBe(0x12_34_bb_78);
    expect(setColorInt32Component(0x12_34_56_78, 3, 0xaa_bb)).toBe(0x12_34_56_bb);
  });
});
