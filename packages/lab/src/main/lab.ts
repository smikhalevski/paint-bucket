import {IColorModel} from '@paint-bucket/core';
import {rgbToLab} from './lab-rgb';

/**
 * CIELAB color space definition.
 */
export const LAB: IColorModel<ILab> = {
  createColor: createLab,
  isColor: isLab,
  componentsToRgb() {
    throw new Error('Not implemented');
  },
  rgbToComponents: rgbToLab,
};

export interface ILab {

  type: 'lab',

  /**
   * L* ∈ [0, 100].
   */
  L: number;

  /**
   * a* ∈ [-128, 128].
   */
  A: number;

  /**
   * b* ∈ [-128, 128].
   */
  B: number;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  a: number;
}

export function isLab(value: any): value is ILab {
  return value?.type === 'lab';
}

/**
 * Creates black color in CIELAB color space.
 */
export function createLab(): ILab;

/**
 * Creates a color in CIELAB color space.
 *
 * @param L L* ∈ [0, 100].
 * @param A a* ∈ [-128, 128].
 * @param B b* ∈ [-128, 128].
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function createLab(L: number, A: number, B: number, a?: number): ILab;

export function createLab(L = 0, A = 0, B = 0, a = 1): ILab {
  return {type: 'lab', L, A, B, a};
}
