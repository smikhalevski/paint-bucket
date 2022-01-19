const {test} = require('@smikhalevski/perf-test');
const chalk = require('chalk');
const tinycolor2 = require('tinycolor2');
const chroma = require('chroma-js');
const {color} = require('paint-bucket');

const rgb = [0xAB, 0xCD, 0xEF];
const hexColors = ['#fff', '#000'];

console.log(chalk.inverse(' Create color from components '));
gc();
test('tinycolor2  ', () => tinycolor2(rgb), {timeout: 10000});
gc();
test('chroma      ', () => chroma(rgb), {timeout: 10000});
gc();
test('paint-bucket', () => color(rgb), {timeout: 10000});

console.log('\n' + chalk.inverse(' Parse color from short HEX '));
gc();
test('tinycolor2  ', () => tinycolor2('#abc'), {timeout: 10000});
gc();
test('chroma      ', () => chroma('#abc'), {timeout: 10000});
gc();
test('paint-bucket', () => color('#abc'), {timeout: 10000});

console.log('\n' + chalk.inverse(' Parse color from 24-bit HEX '));
gc();
test('tinycolor2  ', () => tinycolor2('#abcdef'), {timeout: 10000});
gc();
test('chroma      ', () => chroma('#abcdef'), {timeout: 10000});
gc();
test('paint-bucket', () => color('#abcdef'), {timeout: 10000});

console.log('\n' + chalk.inverse(' Parse color from 32-bit HEX '));
gc();
test('tinycolor2  ', () => tinycolor2('#abcdefff'), {timeout: 10000});
gc();
test('chroma      ', () => chroma('#abcdefff'), {timeout: 10000});
gc();
test('paint-bucket', () => color('#abcdefff'), {timeout: 10000});

console.log('\n' + chalk.inverse(' Parse color from 24-bit integer '));
gc();
test('tinycolor2  ', () => tinycolor2(0xAB_CD_EF), {timeout: 10000});
gc();
test('chroma      ', () => chroma(0xAB_CD_EF), {timeout: 10000});
gc();
test('paint-bucket', () => color(0xAB_CD_EF), {timeout: 10000});

console.log('\n' + chalk.inverse(' Parse color from RGBa '));
gc();
test('tinycolor2  ', () => tinycolor2('rgba(128,128,128,0.5)'), {timeout: 10000});
gc();
test('chroma      ', () => chroma('rgba(128,128,128,0.5)'), {timeout: 10000});
gc();
test('paint-bucket', () => color('rgba(128,128,128,0.5)'), {timeout: 10000});

console.log('\n' + chalk.inverse(' Desaturate color '));
{
  let c;
  gc();
  test('tinycolor2  ', () => c.desaturate().toRgb(), {
    timeout: 10000,
    beforeCycle() {
      c = tinycolor2(rgb);
    },
  });
  gc();
  test('chroma      ', () => c.desaturate().rgb(), {
    timeout: 10000,
    beforeCycle() {
      c = chroma(rgb);
    },
  });
  gc();
  test('paint-bucket', () => c.saturation(50).rgb(), {
    timeout: 10000,
    beforeCycle() {
      c = color(rgb);
    },
  });
}

console.log('\n' + chalk.inverse(' Spin + lighten color '));
{
  let c
  ;
  gc();
  test('tinycolor2  ', () => c.spin(90).lighten().toRgb(), {
    timeout: 10000,
    beforeCycle() {
      c = tinycolor2(rgb);
    },
  });
  gc();
  test('paint-bucket', () => c.hue(90).lightness(10).rgb(), {
    timeout: 10000,
    beforeCycle() {
      c = color(rgb);
    },
  });
}

console.log('\n' + chalk.inverse(' Create gradient from HEX '));
gc();
test('chroma      ', () => chroma.scale(hexColors), {timeout: 10000});
gc();
test('paint-bucket', () => color.gradient(hexColors), {timeout: 10000});

console.log('\n' + chalk.inverse(' Linear interpolate gradient '));
gc();
const chromaGradient = chroma.scale(hexColors);
test('chroma      ', () => chromaGradient(0.7), {timeout: 10000});
gc();
const paintBucketGradient = color.gradient(hexColors);
test('paint-bucket', () => paintBucketGradient.at(0.7), {timeout: 10000});
