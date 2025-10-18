import { describe, test, expect } from 'vitest';
import { Color } from '../../../main/core.js';
import '../../../main/plugin/css';
import '../../../main/plugin/palette';
import '../../../main/plugin/rgb';

function toCss(color: Color): string {
  return color.css();
}

describe('complement', () => {
  test('returns complement colors', () => {
    expect(Color.parse('#f00').complement().css()).toStrictEqual('#00ffff');
  });
});

describe('triad', () => {
  test('returns triad colors', () => {
    expect(Color.parse('#f00').triad().map(toCss)).toStrictEqual(['#ff0000', '#00ff00', '#0000ff']);
  });
});

describe('tetrad', () => {
  test('returns tetrad colors', () => {
    expect(Color.parse('#f00').tetrad().map(toCss)).toStrictEqual(['#ff0000', '#80ff00', '#00ffff', '#7f00ff']);
  });
});

describe('splitComplement', () => {
  test('returns splitComplement colors', () => {
    expect(Color.parse('#f00').splitComplement().map(toCss)).toStrictEqual(['#ff0000', '#ccff00', '#0066ff']);
  });
});

describe('analogous', () => {
  test('returns analogous colors', () => {
    expect(Color.parse('#f00').analogous().map(toCss)).toStrictEqual([
      '#ff0000',
      '#ff0066',
      '#ff0033',
      '#ff0000',
      '#ff3300',
      '#ff6600',
    ]);
  });
});

describe('monochromatic', () => {
  test('returns monochromatic colors', () => {
    expect(Color.parse('#f00').monochromatic().map(toCss)).toStrictEqual([
      '#ff0000',
      '#2b0000',
      '#550000',
      '#800000',
      '#aa0000',
      '#d40000',
    ]);
  });
});
