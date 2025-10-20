import { describe, test, expect } from 'vitest';
import { clr } from '../main/index.js';

describe('clr', () => {
  test('parses hex color', () => {
    expect(clr('#abc').rgb()).toStrictEqual([170, 187, 204, 1]);
  });
});

describe('clr.gradient', () => {
  test('default color is black', () => {
    expect(clr.gradient().at(0).css()).toBe('#000000');
    expect(clr.gradient().at(1).css()).toBe('#000000');

    expect(clr.gradient([]).at(0).css()).toBe('#000000');
    expect(clr.gradient([]).at(1).css()).toBe('#000000');
  });

  test('creates a gradient with equidistant stops', () => {
    const gradient1 = clr.gradient(['#fff', '#000']);
    const gradient2 = clr.gradient(['#fff', 'red', '#000']);

    expect(gradient1.at(0).css()).toBe('#ffffff');
    expect(gradient1.at(0.5).css()).toBe('#808080');
    expect(gradient1.at(1).css()).toBe('#000000');

    expect(gradient2.at(0).css()).toBe('#ffffff');
    expect(gradient2.at(1).css()).toBe('#ff0000');
    expect(gradient2.at(2).css()).toBe('#000000');
  });

  test('creates a gradient with equidistant stops and values', () => {
    const gradient1 = clr.gradient(['#fff', 'red', '#000'], 11);
    const gradient2 = clr.gradient(['#fff', 'red', '#000'], 0, 1);

    expect(gradient1.at(11).css()).toBe('#ffffff');
    expect(gradient1.at(12).css()).toBe('#ff0000');
    expect(gradient1.at(13).css()).toBe('#000000');

    expect(gradient2.at(0).css()).toBe('#ffffff');
    expect(gradient2.at(0.5).css()).toBe('#ff0000');
    expect(gradient2.at(1).css()).toBe('#000000');
  });

  test('creates a gradient and adds stops', () => {
    const gradient = clr.gradient().stop(0, 'red').stop(50, 'pink').stop(100, 'blue');

    expect(gradient.at(70).css()).toBe('#9973e0');
  });
});
