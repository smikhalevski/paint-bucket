const nodeResolve = require('@rollup/plugin-node-resolve');
const dts = require('rollup-plugin-dts');
const fs = require('fs');
const path = require('path');

module.exports = ['index', 'core', 'utils']
  .concat(fs.readdirSync('./gen/color-model').map(name => 'color-model/' + path.basename(name) + '/index'))
  .concat(fs.readdirSync('./gen/plugin').map(name => 'plugin/' + path.basename(name) + '/index'))
  .flatMap(name => [
    {
      input: './gen/' + name + '.js',
      output: [
        { file: './lib/' + name + '.js', format: 'cjs' },
        { file: './lib/' + name + '.mjs', format: 'es' },
      ],
      plugins: [nodeResolve()],
      external: /algomatic|(\..*\/(color-model|plugin|core|utils))/,
    },
    {
      input: './gen/' + name + '.d.ts',
      output: { file: './lib/' + name + '.d.ts', format: 'es' },
      plugins: [dts.default()],
      external: /algomatic|(\..*\/(color-model|plugin|core|utils))/,
    },
  ]);
