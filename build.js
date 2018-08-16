const pkg = require('./package.json');
const rollup = require('rollup');
const babel = require('rollup-plugin-babel');

const inputOptions = {
  input: 'src/index.js',
  plugins: [babel()],
};

const outputOptions = {
  name: 'VuePacker',
  file: pkg.main,
  format: 'cjs',
};

async function build() {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.write(outputOptions);
}

build();
