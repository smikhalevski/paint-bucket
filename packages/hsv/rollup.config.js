import nodeResolve from '@rollup/plugin-node-resolve';

export default {
  input: './lib/index.js',
  output: {
    file: './lib/index-cjs.js',
    format: 'cjs',
  },
  external: /^[@\w]/,
  plugins: [nodeResolve()],
};
