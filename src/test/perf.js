const {test} = require('@smikhalevski/perf-test');
const chalk = require('chalk');
const tinycolor2 = require('tinycolor2');
const chroma = require('chroma-js');
const {color} = require('../../lib/index-cjs');

console.log(chalk.inverse(' Create RGB instance '));
{
  const rgb = [255, 255, 255];

  test('tinycolor2  ', () => tinycolor2(rgb), {timeout: 10000});
  test('chroma      ', () => chroma(rgb), {timeout: 10000});
  test('paint-bucket', () => color(rgb), {timeout: 10000});
}

console.log(chalk.inverse(' Desaturate '));
{
  const rgb = [255, 255, 255];

  test('tinycolor2  ', () => tinycolor2(rgb).desaturate().toRgb().r, {timeout: 10000});
  test('chroma      ', () => chroma(rgb).desaturate().get('rgb.r'), {timeout: 10000});
  test('paint-bucket', () => color(rgb).saturation((S) => S * 0.5).red(), {timeout: 10000});
}
