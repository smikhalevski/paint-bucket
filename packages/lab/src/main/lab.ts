import {IColorModel} from '@paint-bucket/core';
import {labToRgb, rgbToLab} from './lab-rgb';

/**
 * CIELAB color model definition.
 */
export const LAB: IColorModel<ILab> = {
  createComponents: createLab,
  cloneComponents: (lab) => copyLab(lab, createLab()),
  componentsToRgb: labToRgb,
  rgbToComponents: rgbToLab,
};

export interface ILab {

  /**
   * CIE Lightness L* ∈ [0, 100].
   */
  L: number;

  /**
   * Red/Green coordinate a* ∈ [-128, 128].
   */
  A: number;

  /**
   * Yellow/Blue coordinate b* ∈ [-128, 128].
   */
  B: number;

  /**
   * Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
   */
  a: number;
}

/**
 * Creates black color in CIELAB color model.
 */
export function createLab(): ILab;

/**
 * Creates a color in CIELAB color model.
 *
 * @param L CIE Lightness L* ∈ [0, 100].
 * @param A Red/Green coordinate a* ∈ [-128, 128].
 * @param B Yellow/Blue coordinate b* ∈ [-128, 128].
 * @param [a = 1] Alpha ∈ [0, 1], 0 = transparent, 1 = opaque.
 */
export function createLab(L: number, A: number, B: number, a?: number): ILab;

export function createLab(L = 0, A = 0, B = 0, a = 1): ILab {
  return {L, A, B, a};
}

export function copyLab(lab1: ILab, lab2: ILab): ILab {
  lab2.L = lab1.L;
  lab2.A = lab1.A;
  lab2.B = lab1.B;
  lab2.a = lab1.a;
  return lab2;
}
