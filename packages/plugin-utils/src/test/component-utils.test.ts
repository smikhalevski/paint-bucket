import { composeComponents, getComponent, normalizeComponents, setComponent } from '../main';

describe('normalizeComponents', () => {
  test('normalizes raw color bytes', () => {
    expect(normalizeComponents(0x1, 1)).toBe(0x11_11_11_ff);
    expect(normalizeComponents(0x12, 2)).toBe(0x12_12_12_ff);
    expect(normalizeComponents(0x123, 3)).toBe(0x11_22_33_ff);
    expect(normalizeComponents(0x1234, 4)).toBe(0x11_22_33_44);
    expect(normalizeComponents(0x123456, 6)).toBe(0x12_34_56_ff);
    expect(normalizeComponents(0x12345678, 8)).toBe(0x12_34_56_78);
  });

  test('returns black for invalid nibble count', () => {
    expect(normalizeComponents(0x123, 0)).toBe(0);
    expect(normalizeComponents(0x12345, 5)).toBe(0);
    expect(normalizeComponents(0x1234567, 7)).toBe(0);
    expect(normalizeComponents(0x123456789a, 10)).toBe(0);
  });
});

describe('composeComponents', () => {
  test('assembles color from bytes', () => {
    expect(composeComponents(0x12, 0x34, 0x56, 0x78)).toBe(0x12345678);
  });

  test('clamps bytes', () => {
    expect(composeComponents(0x12, 0xaa_34, 0x56, 0xaa_78)).toBe(0x12ff56ff);
  });
});

describe('getComponent', () => {
  test('gets the color byte', () => {
    const color = 0x12_34_56_aa;

    expect(getComponent(color, 0)).toBe(0x12);
    expect(getComponent(color, 1)).toBe(0x34);
    expect(getComponent(color, 2)).toBe(0x56);
    expect(getComponent(color, 3)).toBe(0xaa);
  });
});

describe('setComponent', () => {
  test('sets the color byte', () => {
    expect(setComponent(0x12_34_56_78, 0, 0xaa)).toBe(0xaa_34_56_78);
    expect(setComponent(0x12_34_56_78, 1, 0xaa)).toBe(0x12_aa_56_78);
    expect(setComponent(0x12_34_56_78, 2, 0xaa)).toBe(0x12_34_aa_78);
    expect(setComponent(0x12_34_56_78, 3, 0xaa)).toBe(0x12_34_56_aa);

    expect(setComponent(0x12_34_56_78, 0, 0xa)).toBe(0x0a_34_56_78);
    expect(setComponent(0x12_34_56_78, 1, 0xa)).toBe(0x12_0a_56_78);
    expect(setComponent(0x12_34_56_78, 2, 0xa)).toBe(0x12_34_0a_78);
    expect(setComponent(0x12_34_56_78, 3, 0xa)).toBe(0x12_34_56_0a);

    expect(setComponent(0x12_34_56_78, 0, 0xa0)).toBe(0xa0_34_56_78);
    expect(setComponent(0x12_34_56_78, 1, 0xa0)).toBe(0x12_a0_56_78);
    expect(setComponent(0x12_34_56_78, 2, 0xa0)).toBe(0x12_34_a0_78);
    expect(setComponent(0x12_34_56_78, 3, 0xa0)).toBe(0x12_34_56_a0);
  });

  test('prevents overflow', () => {
    expect(setComponent(0x12_34_56_78, 0, 0xaa_bb)).toBe(0xff_34_56_78);
    expect(setComponent(0x12_34_56_78, 1, 0xaa_bb)).toBe(0x12_ff_56_78);
    expect(setComponent(0x12_34_56_78, 2, 0xaa_bb)).toBe(0x12_34_ff_78);
    expect(setComponent(0x12_34_56_78, 3, 0xaa_bb)).toBe(0x12_34_56_ff);
  });
});
