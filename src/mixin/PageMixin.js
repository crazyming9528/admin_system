//页面级混入  所有的页面级组件  都应该混入pageMixin
const pageMixin = {
  data() {
    return {}
  },
  computed: {
    pageMixin_showPage: function () {
      return this.$store.getters.getRequestCompleted;
    }

  },
  methods: {
    //面包屑
    pageMixin_refreshBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      matched = [{path: '/', meta: {title: 'Home'}}].concat(matched);
      let breadcrumb = matched;
      this.$store.commit('refreshBreadList', breadcrumb);
    },
    // 十秒后 请求没有完成 就强行显示页面
    pageMixin_forceShowPage() {

      setTimeout(() => {

        if (!this.pageMixin_showPage) {
          this.pageMixin_showPage = true;
        }

      }, 10000)

    }

  },
  created() {
    this.pageMixin_refreshBreadcrumb();
    this.pageMixin_forceShowPage();

  }
};


export default pageMixin;
