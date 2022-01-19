/**
 * Bubble sort that sorts values and weights in parallel in ascending order.
 *
 * **Note:** This method mutates input arrays.
 *
 * @param values The list of arbitrary values.
 * @param weights The list of weights that is used for sorting.
 */
export function parallelSort(values: unknown[], weights: number[]): void {
  let n = weights.length;

  while (n > 1) {
    let nextN = 0;

    for (let i = 1; i < n; ++i) {
      const w0 = weights[i - 1];
      const w1 = weights[i];

      if (w0 > w1) {
        weights[i - 1] = w1;
        weights[i] = w0;

        const v0 = values[i - 1];
        values[i - 1] = values[i];
        values[i] = v0;

        nextN = i;
      }
    }
    n = nextN;
  }
}
