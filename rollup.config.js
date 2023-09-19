const nodeResolve = require('@rollup/plugin-node-resolve');
const dts = require('rollup-plugin-dts');
const fs = require('fs');
const path = require('path');

const external = /algomatic|\..*\/(core|utils|color-model|plugin)/;

module.exports = ['index', 'core', 'utils']
  .concat(
    fs.readdirSync('gen/color-model').map(it => `color-model/${it}/index`),
    fs.readdirSync('gen/plugin').map(it => `plugin/${it}/index`)
  )
  .flatMap(input => [
    {
      input: `gen/${input}.js`,
      output: [
        { file: `lib/${input}.js`, format: 'cjs' },
        { file: `lib/${input}.mjs`, format: 'es' },
      ],
      plugins: [
        nodeResolve(),

        // Append a file extension to relative imports and exports
        {
          renderChunk: (code, chunk) => code.replace(/(require\(|from )'\.[^']+/g, '$&' + path.extname(chunk.fileName)),
        },
      ],
      external,
    },
    {
      input: `gen/${input}.d.ts`,
      output: { file: `lib/${input}.d.ts`, format: 'es' },
      plugins: [dts.default()],
      external,
    },
  ]);
