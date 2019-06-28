//表格的 混入
const tableMixin = {
  data() {
    return {
      tableMixin_currentPage: 1,
      tableMixin_pageSize: 10,
      tableMixin_total: 0,
      tableMixin_pageSizeArr: [10, 20, 50, 100, 200],
    }
  },
  computed: {},
  methods: {
    /**
     * 切换分页
     * @param val
     */
    tableMixin_handleCurrentChange(val) {
      this.tableMixin_currentPage = val;
      this.getTableDataSource();
    },
    /**
     * 改变分页 页面显示条数
     * @param val
     */
    tableMixin_handleSizeChange(val) {
      this.tableMixin_pageSize = val;
      this.tableMixin_savePageSize(val);
      this.tableMixin_currentPage = 1;
      this.getTableDataSource();
    },
    /**
     * 重置分页
     */
    tableMixin_resetPaging() {
      this.tableMixin_currentPage = 1;
      this.tableMixin_pageSize = 10;
      localStorage.removeItem('tableMixin_pageSize');
    },
    /**
     * 将分页显示大小 本地存储
     * @param v
     */
    tableMixin_savePageSize(v) {
      if (typeof (Storage) === undefined) {
        alert('你的浏览器不支持本地存储 请使用新版浏览器')
      } else {
        localStorage.setItem('tableMixin_pageSize', v);
      }

    },
    /**
     * 获取本地存储的 分页显示大小
     * @param v
     */
    tableMixin_getPageSize(v) {
      if (typeof (Storage) === undefined) {
        alert('你的浏览器不支持本地存储 请使用新版浏览器')
      } else {
        this.tableMixin_pageSize = Number(localStorage.getItem('tableMixin_pageSize')) || this.tableMixin_pageSize;
      }

    }

  },

  created() {
    this.tableMixin_getPageSize();
  },
  mounted() {


  }
};


export default tableMixin;
