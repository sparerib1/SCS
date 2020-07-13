import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: () => import('../views/Login.vue') },
  {
    path: '/',
    name: 'home',
    redirect: 'index',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'document',
        name: 'document',
        component: () => import('../views/Document.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 添加路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = !!localStorage.eleToken
  if (to.path === '/login') {
    next()
  } else {
   isLogin ? next() : next('/login')
  }
})

export default router
