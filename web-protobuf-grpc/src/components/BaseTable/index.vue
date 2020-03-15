<script>
export default {
  // 默认情况下父作用域的不被认作 props 的特性绑定 (attribute bindings) 将会“回退”且作为普通的 HTML 特性应用在子组件的根元素上。
  // 通过设置 inheritAttrs到 false，这些默认行为将会被去掉。
  inheritAttrs: false,
  props: {
    tableHeader: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      attrs: {},
      elTableProps: {},
      elPaginationProps: {},
      pageIndex: 1,
      loading: true
    };
  },
  watch: {
    $attrs() {
      this.attrs = this.$attrs;
      this.setHeight();
    }
  },
  mounted() {
    this.elTableProps = this.$children[0]._props;
    this.elPaginationProps = this.$children[1]._props;
  },
  methods: {
    setHeight() {
      this.attrs.height -= this.$refs.pagination.offsetHeight;
    },
    // 将传进来的参数进行分类，分成table和pagination各自的参数
    setTableProps(rawAttrs, componentProps) {
      const tableProps = {};
      const paginationProps = {};
      const has = Object.prototype.hasOwnProperty;
      Object.keys(rawAttrs).forEach(key => {
        const value = rawAttrs[key];
        if (has.call(componentProps, key)) {
          tableProps[key] = value;
        } else {
          paginationProps[key] = value;
        }
      });
      this.loading = false;
      return { tableProps, paginationProps };
    },
    selectionChange(val) {
      this.$emit("selectionChange", val);
      
    },
    pageSizeChange(pageSize) {
      this.$emit("pageSizeChange", pageSize);
    },
    currentPageChange(pageIndex) {
      this.$emit("currentPageChange", pageIndex);
    }
  },
  render() {
    const {
      elTableProps,
      attrs,
      tableHeader,
      selectionChange,
      pageSizeChange,
      currentPageChange,
      loading
    } = this;
    const { tableProps, paginationProps } = this.setTableProps(
      attrs,
      elTableProps
    );
    const tableAttrs = {
      props: {
        ...tableProps
      },
      on: {
        "selection-change": selectionChange
      }
    };
    const paginationAttrs = {
      props: {
        ...paginationProps
      },
      on: {
        "size-change": pageSizeChange,
        "current-change": currentPageChange
      }
    };
    return (
      <div>
        <el-table
          v-loading={loading}
          style="width: 100%"
          highlight-current-row
          {...tableAttrs}
        >
          {tableHeader.map(column => {
            const { scopedSlots, ...columnProps } = column;
            const columnAttrs = {
              props: {
                ...columnProps
              },
              scopedSlots
            };
            return <el-table-column {...columnAttrs} />;
          })}
        </el-table>
        <div ref="pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next, jumper"
            {...paginationAttrs}
          />
        </div>
      </div>
    );
  }
};
</script>

<style lang="scss" scoped>
.el-pagination {
  padding: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
