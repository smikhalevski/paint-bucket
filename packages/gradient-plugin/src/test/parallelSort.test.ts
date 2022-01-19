import {parallelSort} from '../main/parallelSort';

describe('parallelSort', () => {

  test('sorts two values and weights', () => {
    const values = ['b', 'a'];
    const weights = [2, 1];

    parallelSort(values, weights);

    expect(values).toEqual(['a', 'b']);
    expect(weights).toEqual([1, 2]);
  });

  test('sorts multiple values and weights', () => {
    const values = ['c', 'a', 'b'];
    const weights = [3, 1, 2];

    parallelSort(values, weights);

    expect(values).toEqual(['a', 'b', 'c']);
    expect(weights).toEqual([1, 2, 3]);
  });
});
