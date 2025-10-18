import { describe, test, measure, beforeIteration } from 'toofast';
import tinycolor2 from 'tinycolor2';
import chromaJs from 'chroma-js';
import * as paintBucket from '../../lib/index.js';
import * as algomatic from 'algomatic';

// Create color from components
describe('clr([255, 255, 255])', () => {
  test('tinycolor2', () => {
    const rgb = { r: 0xab, g: 0xcd, b: 0xef };
    measure(() => tinycolor2(rgb));
  });

  test('chroma.js', () => {
    const rgb = [0xab, 0xcd, 0xef];
    measure(() => chromaJs(rgb));
  });

  test('paint-bucket', () => {
    const rgb = [0xab, 0xcd, 0xef];
    measure(() => paintBucket.clr(rgb));
  });
});

// Parse color from short HEX
describe("clr('#abc')", () => {
  test('tinycolor2', () => {
    measure(() => tinycolor2('#abc'));
  });

  test('chroma.js', () => {
    measure(() => chromaJs('#abc'));
  });

  test('paint-bucket', () => {
    measure(() => paintBucket.clr('#abc'));
  });
});

// Parse color from 24-bit HEX
describe("clr('#abcdef')", () => {
  test('tinycolor2', () => {
    measure(() => tinycolor2('#abcdef'));
  });

  test('chroma.js', () => {
    measure(() => chromaJs('#abcdef'));
  });

  test('paint-bucket', () => {
    measure(() => paintBucket.clr('#abcdef'));
  });
});

// Parse color from 32-bit HEX
describe("clr('#abcdefff')", () => {
  test('tinycolor2', () => {
    measure(() => tinycolor2('#abcdefff'));
  });

  test('chroma.js', () => {
    measure(() => chromaJs('#abcdefff'));
  });

  test('paint-bucket', () => {
    measure(() => paintBucket.clr('#abcdefff'));
  });
});

// Parse color from 24-bit integer
describe('clr(0xab_cd_ef)', () => {
  // Not supported
  // test('tinycolor2', (measure) => {
  //   measure(() => tinycolor2(0xab_cd_ef));
  // });

  test('chroma.js', () => {
    measure(() => chromaJs(0xab_cd_ef));
  });

  test('paint-bucket', () => {
    measure(() => paintBucket.clr(0xab_cd_ef));
  });
});

// Parse color from 32-bit integer
describe('clr().rgb32(0xab_cd_ef_ff)', () => {
  // Not supported
  // test('tinycolor2', (measure) => {
  //   measure(() => tinycolor2(0xab_cd_ef_ff));
  // });

  // Not supported
  // test('chroma.js', (measure) => {
  //   measure(() => chromaJs(0xab_cd_ef_ff));
  // });

  test('paint-bucket', () => {
    measure(() => paintBucket.clr().rgb32(0xab_cd_ef_ff));
  });
});

// Parse color from RGBa
describe("clr('rgba(128, 128, 128, 0.5)')", () => {
  test('tinycolor2', () => {
    measure(() => tinycolor2('rgba(128,128,128,0.5)'));
  });

  test('chroma.js', () => {
    measure(() => chromaJs('rgba(128,128,128,0.5)'));
  });

  test('paint-bucket', () => {
    measure(() => paintBucket.clr('rgba(128,128,128,0.5)'));
  });
});

// Desaturate color
describe('clr().saturation(50).rgb()', () => {
  test('tinycolor2', () => {
    const rgb = { r: 0xab, g: 0xcd, b: 0xef };
    let color;

    beforeIteration(() => {
      color = tinycolor2(rgb);
    });
    measure(() => color.desaturate().toRgb());
  });

  test('chroma.js', () => {
    const rgb = [0xab, 0xcd, 0xef];
    let color;

    beforeIteration(() => {
      color = chromaJs(rgb);
    });
    measure(() => color.desaturate().rgb());
  });

  test('paint-bucket', () => {
    const rgb = [0xab, 0xcd, 0xef];
    let color;

    beforeIteration(() => {
      color = paintBucket.clr(rgb);
    });

    measure(() => color.saturation(50).rgb());
  });
});

// Spin + lighten color
describe('clr().hue(90).lightness(10).rgb()', () => {
  test('tinycolor2', () => {
    const rgb = { r: 0xab, g: 0xcd, b: 0xef };
    let color;

    beforeIteration(() => {
      color = tinycolor2(rgb);
    });
    measure(() => color.spin(90).lighten().toRgb());
  });

  test('paint-bucket', () => {
    const rgb = [0xab, 0xcd, 0xef];
    let color;

    beforeIteration(() => {
      color = paintBucket.clr(rgb);
    });

    measure(() => color.hue(90).lightness(10).rgb());
  });
});

// Create gradient from HEX
describe('clr.gradient(["#fff", "#000"])', () => {
  const colors = ['#fff', '#000'];

  test('chroma.js', () => {
    measure(() => chromaJs.scale(colors));
  });

  test('paint-bucket', () => {
    measure(() => paintBucket.clr.gradient(colors));
  });
});

// Interpolate linear RGB gradient
describe('clr.gradient(…).at(0.5, RGB, lerp)', () => {
  const colors = ['#fff', '#000'];

  test('chroma.js', () => {
    const gradient = chromaJs.scale(colors).mode('lrgb');

    measure(() => gradient(0.7));
  });

  test('paint-bucket', () => {
    const gradient = paintBucket.clr.gradient(colors);

    measure(() => gradient.at(0.7, paintBucket.RGB, algomatic.lerp));
  });
});

// Interpolate spline LAB gradient
describe('clr.gradient(…).at(0.5, LAB, csplineMonot)', () => {
  const colors = ['#fff', '#000'];

  test('chroma.js', () => {
    const gradient = chromaJs.scale(colors).mode('lab');

    measure(() => gradient(0.7));
  });

  test('paint-bucket', () => {
    const gradient = paintBucket.clr.gradient(colors);

    measure(() => gradient.at(0.7, paintBucket.LAB, algomatic.csplineMonot));
  });
});
