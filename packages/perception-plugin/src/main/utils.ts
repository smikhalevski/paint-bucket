import {deltaE2000} from './deltaE2000';
import {ILab} from '@paint-bucket/lab';

/**
 * Returns `true` if colors are visually indistinguishable.
 */
export function areIndistinguishableColors(lab1: ILab, lab2: ILab): boolean {
  return deltaE2000(lab1, lab2) <= 2;
}
