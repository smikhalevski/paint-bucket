import { Color } from '../../../main/core';
import labPlugin from '../../../main/plugin/lab';

labPlugin(Color);

describe('lab', () => {
  test('mutates LAB color components', () => {
    expect(new Color().lab([11, 22, 33]).lab()).toEqual([11, 22, 33, 1]);
  });
});
