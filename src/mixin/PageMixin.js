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
    /**
     *从路由参数中  拼出 面包屑导航
     */
    pageMixin_refreshBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title);
      matched = [{path: '/', meta: {title: 'Home'}}].concat(matched)
      let breadcrumb = matched;
      this.$store.commit('refreshBreadList', breadcrumb);
    },
    /**
     * 十秒后 请求没有完成 就强行显示页面
     */
    pageMixin_forceShowPage() {

      setTimeout(() => {

        if (!this.pageMixin_showPage) {
          this.pageMixin_showPage = true;
        }

      }, 10000)

    },
    /**
     * 切换页面后  进度条到顶部
     */
    pageMixin_toTop() {
      window.scrollTo(0, 0);
      setTimeout(function () {
        var em = document.getElementsByClassName("el-main")
        em[0].scrollTop = 0;
        //console.log(em[0].scrollTop);
      }, 10)

    }

  },
  created() {
    this.pageMixin_refreshBreadcrumb();
    this.pageMixin_forceShowPage();

  },
  mounted() {
    this.pageMixin_toTop();
  }
};


export default pageMixin;
