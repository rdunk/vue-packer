import PackerGenerator from './generator.js';

export default {
  install(Vue, options) {
    const component = PackerGenerator(options);
    Vue.component('vue-packer', component);
  },
};
