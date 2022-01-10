export function linearDomain(minimum: number, maximum: number, count: number, domain: number[]): number[] {
  for (let i = 0; i < count; ++i) {
    domain[i] = minimum + i / (count - 1) * (maximum - minimum);
  }
  return domain;
}
