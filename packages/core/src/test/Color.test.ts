import {Color, IColorModel, IRgb} from '../main';

describe('Color', () => {

  const rgbColorModel: IColorModel<IRgb> = {
    createComponents() {
      return {R: 0, G: 0, B: 0, a: 1};
    },
    cloneComponents(components) {
      return Object.assign({}, components);
    },
    componentsToRgb(components, rgb) {
      Object.assign(rgb, components);
    },
    rgbToComponents(rgb, components) {
      Object.assign(components, rgb);
    },
  };

  const abcColorModel: IColorModel<{ A: number, B: number, C: number, a: number }> = {
    createComponents() {
      return {A: 0, B: 0, C: 0, a: 1};
    },
    cloneComponents(components) {
      return Object.assign({}, components);
    },
    componentsToRgb(components, rgb) {
      rgb.R = components.A * 100;
      rgb.G = components.B * 100;
      rgb.B = components.C * 100;
      rgb.a = components.a;
    },
    rgbToComponents(rgb, components) {
      components.A = rgb.R / 100;
      components.B = rgb.G / 100;
      components.C = rgb.B / 100;
      components.a = rgb.a;
    },
  };

  test('creates a new color', () => {
    expect(Color.create()).toBeInstanceOf(Color);
    expect(Color.factory([])).toBeInstanceOf(Color);
  });

  test('returns the same color', () => {
    let abc1;
    let abc2;

    const color = Color.create();

    (function (this: Color) {
      abc1 = this.forRead(abcColorModel);
    }).call(color);

    (function (this: Color) {
      abc2 = this.forRead(abcColorModel);
    }).call(color);

    expect(abc1).toEqual({A: 0, B: 0, C: 0, a: 1});
    expect(abc1).toBe(abc2);
  });

  test('returns same color for read and update', () => {
    let abc1;
    let abc2;

    const color = Color.create();

    (function (this: Color) {
      abc1 = this.forUpdate(abcColorModel);
    }).call(color);

    (function (this: Color) {
      abc2 = this.forRead(abcColorModel);
    }).call(color);

    expect(abc1).toEqual({A: 0, B: 0, C: 0, a: 1});
    expect(abc1).toBe(abc2);
  });

  test('converts color models', (done) => {
    const color = Color.create();

    (function (this: Color) {
      const abc = this.forUpdate(abcColorModel);
      abc.A = abc.B = abc.C = 1;
    }).call(color);

    (function (this: Color) {
      expect(this.forRead(rgbColorModel)).toEqual({R: 100, G: 100, B: 100, a: 1});
      done();
    }).call(color);
  });

  test('returns initial color', (done) => {
    const rgb: IRgb = {R: 127, G: 127, B: 127, a: 0.77};

    (function (this: Color) {
      expect(this.forRead(rgbColorModel)).toBe(rgb);
      done();
    }).call(Color.create(rgbColorModel, rgb));
  });

});
