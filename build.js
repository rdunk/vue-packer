const rollup = require('rollup');
const babel = require('rollup-plugin-babel');
const uglify = require('rollup-plugin-uglify');

const inputOptions = {
  input: 'src/index.js',
  plugins: [
    babel(),
    uglify(),
  ],
};

const outputOptions = {
  name: 'VuePacker',
  file: 'dist/vue-packer.js',
  format: 'cjs',
};

async function build() {
  const bundle = await rollup.rollup(inputOptions);
  // generate code and sourcemap
  // const { code, map } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}

build();
