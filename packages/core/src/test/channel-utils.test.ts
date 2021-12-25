import {composeChannels, getColorChannel, normalizeChannels, setColorChannel} from '../main';

describe('normalizeChannels', () => {

  test('normalizes raw color bytes', () => {
    expect(normalizeChannels(0x1, 1)).toBe(0x11_11_11_FF);
    expect(normalizeChannels(0x12, 2)).toBe(0x12_12_12_FF);
    expect(normalizeChannels(0x123, 3)).toBe(0x11_22_33_FF);
    expect(normalizeChannels(0x1234, 4)).toBe(0x11_22_33_44);
    expect(normalizeChannels(0x123456, 6)).toBe(0x12_34_56_FF);
    expect(normalizeChannels(0x12345678, 8)).toBe(0x12_34_56_78);
  });

  test('returns black for invalid nibble count', () => {
    expect(normalizeChannels(0x123, 0)).toBe(0);

    expect(normalizeChannels(0x123, 0)).toBe(1);
    expect(normalizeChannels(0x12345, 5)).toBe(1);
    expect(normalizeChannels(0x1234567, 7)).toBe(1);
    expect(normalizeChannels(0x123456789A, 10)).toBe(1);
  });
});

describe('composeChannels', () => {

  test('assembles color from bytes', () => {
    expect(composeChannels(0x12, 0x34, 0x56, 0x78)).toBe(0x12345678);
  });

  test('clamps bytes', () => {
    expect(composeChannels(0x12, 0xAA_34, 0x56, 0xAA_78)).toBe(0x12FF56FF);
  });
});

describe('getColorChannel', () => {

  test('gets the color byte', () => {
    const color = 0x12_34_56_AA;

    expect(getColorChannel(color, 0)).toBe(0x12);
    expect(getColorChannel(color, 1)).toBe(0x34);
    expect(getColorChannel(color, 2)).toBe(0x56);
    expect(getColorChannel(color, 3)).toBe(0xAA);
  });
});

describe('setColorChannel', () => {

  test('sets the color byte', () => {
    expect(setColorChannel(0x12_34_56_78, 0, 0xAA)).toBe(0xAA_34_56_78);
    expect(setColorChannel(0x12_34_56_78, 1, 0xAA)).toBe(0x12_AA_56_78);
    expect(setColorChannel(0x12_34_56_78, 2, 0xAA)).toBe(0x12_34_AA_78);
    expect(setColorChannel(0x12_34_56_78, 3, 0xAA)).toBe(0x12_34_56_AA);

    expect(setColorChannel(0x12_34_56_78, 0, 0xA)).toBe(0x0A_34_56_78);
    expect(setColorChannel(0x12_34_56_78, 1, 0xA)).toBe(0x12_0A_56_78);
    expect(setColorChannel(0x12_34_56_78, 2, 0xA)).toBe(0x12_34_0A_78);
    expect(setColorChannel(0x12_34_56_78, 3, 0xA)).toBe(0x12_34_56_0A);

    expect(setColorChannel(0x12_34_56_78, 0, 0xA0)).toBe(0xA0_34_56_78);
    expect(setColorChannel(0x12_34_56_78, 1, 0xA0)).toBe(0x12_A0_56_78);
    expect(setColorChannel(0x12_34_56_78, 2, 0xA0)).toBe(0x12_34_A0_78);
    expect(setColorChannel(0x12_34_56_78, 3, 0xA0)).toBe(0x12_34_56_A0);
  });

  test('prevents overflow', () => {
    expect(setColorChannel(0x12_34_56_78, 0, 0xAA_BB)).toBe(0xFF_34_56_78);
    expect(setColorChannel(0x12_34_56_78, 1, 0xAA_BB)).toBe(0x12_FF_56_78);
    expect(setColorChannel(0x12_34_56_78, 2, 0xAA_BB)).toBe(0x12_34_FF_78);
    expect(setColorChannel(0x12_34_56_78, 3, 0xAA_BB)).toBe(0x12_34_56_FF);
  });
});
