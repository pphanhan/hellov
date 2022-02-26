import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Layout from '../layout'
import Register from '../components/Register.vue'
import nav_1 from '../views/nav/nav_1.vue'
import nav_2_1 from '../views/nav/nav_2_1.vue'
import nav_2_2 from '../views/nav/nav_2_2.vue'
import nav_3 from '../views/nav/nav_3.vue'
import nav_4 from '../views/nav/nav_4.vue'
import page_1 from '../views/page_1/index.vue'
import page_3 from '../views/page_3/index.vue'
import menu1 from '../views/nested/menu1/index'
import menu2 from '../views/nested/menu2/index'
import menu2_1 from '../views/nested/menu2/menu2-1/index'
import menu2_2 from '../views/nested/menu2/menu2-2/index'
import menu3 from '../views/nested/menu3/index'
import menu4 from '../views/nested/menu4/index'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }, 
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'a'
    },
    children: [
      {
        path: 'menu1',
        component: menu1, // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' , icon: 'el-icon-s-help'},
      },
      {
        path: 'menu2',
        component: menu2, // Parent router-view
        name: 'Menu2',
        meta: { title: 'Menu2' },
        children: [
          {
            path: 'menu2-1',
            component: menu2_1,
            name: 'Menu2-1',
            meta: { title: 'Menu2-1' }
          },
          {
            path: 'menu2-2',
            component: menu2_2,
            name: 'Menu2-2',
            meta: { title: 'Menu2-2' },
          },
        ]
      },
      {
        path: 'menu3',
        component: menu3,
        name: 'Menu3',
        meta: { title: 'menu3' }
      },
      {
        path: 'menu4',
        component: menu4,
        name: 'Menu4',
        meta: { title: 'menu4' }
      }
    ]
  },

  
],
  mode: "history"
})

export default router