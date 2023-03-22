import { color } from '@paint-bucket/core';
import '../main';

describe('color', () => {
  test('creates color from component array', () => {
    expect(color([128, 128, 128, 0.5]).rgb()).toEqual([128, 128, 128, 0.5]);
  });

  test('creates color from a 24-bit integer', () => {
    expect(color(0xaa_bb_cc).rgb()).toEqual([170, 187, 204, 1]);
  });
});

describe('rgb', () => {
  test('creates color from component array', () => {
    expect(color.rgb([128, 128, 128, 0.5]).rgb()).toEqual([128, 128, 128, 0.5]);
  });

  test('clamps components', () => {
    expect(color.rgb([1000, -1000, 256, 2]).rgb()).toEqual([255, 0, 255, 1]);
  });

  test('sets color from partial component array', () => {
    expect(color([255, 255, 255, 1]).rgb([128, , , 0.5]).rgb()).toEqual([128, 255, 255, 0.5]);
  });
});

describe('rgb24', () => {
  test('creates color from a 24-bit integer', () => {
    expect(color.rgb24(0xff_ff_ff).rgb()).toEqual([255, 255, 255, 1]);
  });
});

describe('rgb32', () => {
  test('creates color from 32-bit integer', () => {
    expect(color.rgb32(0xff_ff_ff_ee).rgb()).toEqual([255, 255, 255, 0.9333333333333333]);
  });
});

describe('red', () => {
  test('returns red color component', () => {
    expect(color(0xfa_80_72).red()).toBe(0xfa);
  });

  test('sets red color component', () => {
    expect(color(0xfa_80_72).red(0xaa).red()).toBe(0xaa);
  });

  test('mutates red color component', () => {
    expect(
      color(0xfa_80_72)
        .red(R => R / 2)
        .red()
    ).toBe(125);
  });
});

describe('green', () => {
  test('returns green color component', () => {
    expect(color(0xfa_80_72).green()).toBe(0x80);
  });

  test('sets green color component', () => {
    expect(color(0xfa_80_72).green(0xaa).green()).toBe(0xaa);
  });
});

describe('blue', () => {
  test('returns blue color component', () => {
    expect(color(0xfa_80_72).blue()).toBe(0x72);
  });

  test('sets blue color component', () => {
    expect(color(0xfa_80_72).blue(0xaa).blue()).toBe(0xaa);
  });
});

describe('alpha', () => {
  test('returns alpha color component', () => {
    expect(color([, , , 0.5]).alpha()).toBe(0.5);
  });

  test('sets alpha color component', () => {
    expect(color(0xfa_80_72).alpha(0.7).alpha()).toBe(0.7);
  });
});

describe('brightness', () => {
  test('returns brightness', () => {
    expect(color(0x00_00_00).brightness()).toBe(0);
    expect(color(0xff_ff_ff).brightness()).toBeCloseTo(1);
    expect(color(0xfa_80_72).brightness()).toBeCloseTo(0.6387);
  });
});

describe('luminance', () => {
  test('returns luminance', () => {
    expect(color(0x00_00_00).luminance()).toBe(0);
    expect(color(0xff_ff_ff).luminance()).toBeCloseTo(1);
    expect(color(0xfa_80_72).luminance()).toBeCloseTo(0.3697);
  });
});

describe('contrast', () => {
  test('returns contrast', () => {
    expect(color(0x00_00_00).contrast(0x00_00_00)).toBe(1);
    expect(color(0x00_00_00).contrast(0xff_ff_ff)).toBe(21);
  });
});

describe('mix', () => {
  test('mixes colors', () => {
    expect(color(0x00_00_00).mix(0x00_00_00, 0.5).rgb24()).toBe(0x00_00_00);
    expect(color(0x00_00_00).mix(0xff_ff_ff, 0.5).rgb24()).toBe(0x80_80_80);
  });
});

describe('greyscale', () => {
  test('makes color greyscale', () => {
    expect(color(0xaa_bb_cc).greyscale().rgb24()).toBe(0xb8_b8_b8);
  });
});
