import { Color } from '../../../main/core';
import labPlugin from '../../../main/plugin/lab';

labPlugin(Color);

describe('lab', () => {
  test('mutates LAB color components', () => {
    expect(new Color().lab([30]).lab()).toEqual([30, 0, 0, 1]);
  });
});
