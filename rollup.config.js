import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/viewport.js',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      globals: {
        'function-batcher': 'FunctionBatcher'
      }
    },
    {
      file: 'dist/viewport.js',
      name: 'Viewport',
      format: 'umd',
      globals: {
        'function-batcher': 'FunctionBatcher'
      }
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
};
