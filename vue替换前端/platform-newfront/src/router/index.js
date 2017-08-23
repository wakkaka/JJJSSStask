import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/Index'
import LoginPage from '@/components/Login'
import UserPage from '@/components/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/main',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/user/:usrname',
      name: 'User',
      component: UserPage
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
