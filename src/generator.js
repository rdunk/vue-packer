const PackerGenerator = function(options = {
  inlineStyles: true,
}) {
  const styles = {
    column: options.inlineStyles ? {
      flex: 1,
    } : {},
    container: options.inlineStyles ? {
      display: 'flex',
      'align-items': 'flex-start',
      'justify-content': 'center',
      'flex-wrap': 'wrap',
    } : {},
  };

  const PackerComponent = {
    mounted() {
      this.build();
      window.addEventListener('resize', this.onResize);
    },
    destroyed() {
      window.removeEventListener('resize', this.onResize);
    },
    props: {
      baseClass: {
        type: String,
        default: 'packer',
      },
      sizerClass: {
        type: String,
        default: 'sizer',
      },
      columnClass: {
        type: String,
        default: 'col',
      },
      tag: {
        type: String,
        default: 'div',
      },
    },
    data() {
      return {
        building: false,
        calculating: false,
        columnCount: 0,
        columns: [],
        initialized: false,
        items: [],
        queue: [],
      };
    },
    computed: {
      content() {
        return this.$slots.default;
      },
      sizerStyle() {
        return this.calculating ? {
          display: 'block',
          visibility: 'hidden !important',
          top: '-1000px !important',
        } : {
            display: 'none',
          };
      },
    },
    methods: {
      onResize() {
        this.build();
      },
      build() {
        // If we are currently building, exit
        if (this.building) return false;
        this.building = true;
        // Get the current number of columns
        const currentColumnCount = this.columnCount;
        // Set the column count, and if it has changed, we rebuild
        return this.setColumnCount().then(() => {
          if (this.columnCount !== currentColumnCount) {
            this.rebuild();
          }
          this.building = false;
        });
      },
      rebuild() {
        // Reset everything
        this.reset();
        // Get the items we want to add
        const items = this.content;
        // Append the items
        this.appendItems(items);
      },
      setColumnCount() {
        // We are calculating
        this.calculating = true;
        // Wait for next tick
        return this.$nextTick().then(() => {
          // Get the container width
          const containerWidth = this.getContainerWidth();
          // Get the column sizer width
          const columnWidth = this.getSizerWidth();
          // Set the number of columns
          this.columnCount = (columnWidth === 0)
            ? 1
            : Math.round(containerWidth / columnWidth);
          // Done, no longer calculating
          this.calculating = false;
        });
      },
      appendItems(items) {
        // Put the items in the queue ...
        this.queue = [...items];
        // ... and begin processing it
        this.$nextTick(this.processQueue);
      },
      processQueue() {
        // Get the shortest column index
        const columnIndex = this.getShortestColumnIndex();
        // Grab the first item in the queue
        const item = this.queue.shift();
        // Push it to the items array
        this.items.push(item);
        // Push it to the correct column array
        this.columns[columnIndex].push(item);
        this.$nextTick(() => {
          // If there are more items in the queue, process them
          if (this.queue.length) this.processQueue();
          else this.initialized = true;
        });
      },
      reset() {
        // Reset the items array
        this.items = [];
        // Reset the columns array
        this.columns = Array.from({ length: this.columnCount }, () => []);
      },
      getShortestColumnIndex() {
        const { columnCount, items } = this;
        // If we only have one column, then return the zero-index
        if (columnCount <= 1) return 0;
        // If we haven't yet filled all the columns, just push to the next empty one
        if (items.length < columnCount) return items.length;
        // Grab the heights of each column
        const heights = this.columns.map((col, i) =>
          this.$refs[`col-${i}`].offsetHeight);
        // Find the shortest column
        const minHeight = Math.min.apply(null, heights);
        // Return the index of the shortest column
        return heights.indexOf(minHeight);
      },
      getSizerWidth() {
        return this.$refs.sizer.offsetWidth;
      },
      getContainerWidth() {
        return this.$refs.packer.offsetWidth;
      },
    },
    render(h) {
      // Sizer element
      const sizer = h('div', {
        class: `${this.baseClass}-${this.sizerClass}`,
        style: this.sizerStyle,
        ref: 'sizer',
      });

      // Column elements
      const columns = this.columns.map((items, index) =>
        h('div', {
          class: `${this.baseClass}-${this.columnClass}`,
          style: styles.column,
          ref: `col-${index}`,
          key: `${index}-${items.count}`,
        }, items));

      const rootElement = h(this.tag, {
        class: this.baseClass,
        style: styles.container,
        ref: 'packer',
      }, [sizer, ...columns]);
      return rootElement;
    },
  };
  return PackerComponent;
}

export default PackerGenerator;