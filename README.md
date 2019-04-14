<p align="center">
  <img width="384" src="https://github.com/rdunk/vue-packer/blob/master/grid.png" alt="Vue Packer">
</p>

<h1 align="center">Vue Packer</h1>

##### A dependency free Vue component for responsive masonry-style cascading grid layouts.

###### [See the demo](https://rdunk.github.io/vue-packer)

Many grid style layout options use existing libraries that perform direct DOM manipulation. This plugin lets Vue take care of all changes to the DOM, so can take advantage of Vue's reactive data without the need for any workarounds or performance drawbacks.

## Installation

Install via npm

```
npm install vue-packer
```

Install globally

```js
import Vue from 'vue';
import VuePacker from 'vue-packer';

const options = {}; // Optional options

Vue.use(VuePacker, {});
```

Or use the component only

```js
import { PackerGenerator } from 'vue-packer';

const options = {}; // Optional options
const VuePacker = PackerGenerator(options);

export default {
  components: {
    VuePacker,
  },
};
```

## Usage

### HTML

Wrap the items you want to display in the grid in the component. The `reactor` property is used to determine when DOM updates should be triggered. It is only necessary if the component needs to react to the number or order of elements. The value of this property should be an **array of unique keys for each element**. If the component only needs to render once on load, you can omit this prop.

```html
<vue-packer :reactor="foo">
  <div v-for="item of items" />
</vue-packer>
```

### CSS

The component uses the width of the `sizer` element to determine the number of columns it should display. Use media queries to set responsive column widths. To set a different class selector, see the available props below.

```css
.packer-sizer {
  width: 25%;
}
```

## Props

The following props can be passed to the plugin component. Note that class extensions follow the `baseClass` and are separated by a hyphen.

| Prop          | Default | Description                                      | Type           |
| :------------ | ------- | ------------------------------------------------ | -------------- |
| `reactor`     | `false` | The data the component watches to detect changes | Array, Boolean |
| `tag`         | div     | The root element tag                             | String         |
| `baseClass`   | packer  | The root element class                           | String         |
| `sizerClass`  | sizer   | The class extension for the sizer element        | String         |
| `columnClass` | col     | The class extension for the column element       | String         |

## Plugin Options

By default, this plugin uses flexbox. If you need to disable the inline styles for whatever reason and apply CSS rules directly to the column or container elements via class selectors, set the `inlineStyles` option to false.

```js
Vue.use(VuePacker, { inlineStyles: false });
```

| Option         | Default | Type    |
| :------------- | ------- | ------- |
| `inlineStyles` | `true`  | Boolean |

## License

[MIT](http://opensource.org/licenses/MIT)
