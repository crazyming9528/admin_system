import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/user/login'
import Register from '@/components/user/register'
import Frame from '@/components/frame'
import Home from '@/components/home/home'
import NewsManagement from '@/components/news/newsManagement'
import ReleaseNews from '@/components/news/releaseNews'
import SlideshowManagement from '@/components/news/slideshow-management'
import NewsCatalogue from '@/components/news/newsCatalogue'
import CommentManagement from '@/components/news/commentsManagement'



import UserManagement from '@/components/user/userManagement'
import Role from '@/components/user/role'


import Config from '@/components/setting/config'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Frame',
      component: Frame,
      children: [
        {path: '/', redirect: 'home'},
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'newsManagement',
          name: 'newsManagement',
          component: NewsManagement
        },
        {
          path: 'releaseNews',
          name: 'releaseNews',
          component: ReleaseNews
        },{
          path: 'slideshowManagement',
          name: 'slideshowManagement',
          component: SlideshowManagement
        },
        {
          path: 'newsType',
          name: 'newsType',
          component: NewsCatalogue
        },
        {
          path: 'comments',
          name: 'comments',
          component:CommentManagement
        },
        {

          path: 'userManagement',
          name: 'userManagement',
          component: UserManagement


        },{
          path: 'role',
          name: 'role',
          component: Role
        },{
          path: 'config',
          name: 'config',
          component: Config
        }

      ]
    }

  ]
})
