import {clamp} from 'numeric-wrench';
import {IHsl} from '@paint-bucket/hsl';

/**
 * Increases or decreases the color lightness by an absolute delta.
 */
export function adjustLightness(hsl: IHsl, delta: number): void {
  hsl.L = clamp(hsl.L + delta, 0, 100);
}

/**
 * Increases or decreases the color lightness by a percentage.
 */
export function adjustLightnessBy(hsl: IHsl, percent: number): void {
  hsl.L = clamp(hsl.L * (1 + percent), 0, 100);
}
