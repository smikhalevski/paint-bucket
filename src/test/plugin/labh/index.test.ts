import { describe, test, expect } from 'vitest';
import { Color } from '../../../main/core.js';
import '../../../main/plugin/labh';

describe('labh', () => {
  test('mutates LABh color components', () => {
    expect(new Color().labh([11, 22, 33]).labh()).toStrictEqual([11, 22, 33, 1]);
  });
});
