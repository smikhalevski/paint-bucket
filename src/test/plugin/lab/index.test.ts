import { describe, test, expect } from 'vitest';
import { Color } from '../../../main/core.js';
import '../../../main/plugin/lab';

describe('lab', () => {
  test('mutates LAB color components', () => {
    expect(new Color().lab([11, 22, 33]).lab()).toStrictEqual([11, 22, 33, 1]);
  });
});
