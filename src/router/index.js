import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import("../views/Login.vue")
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("../views/Login.vue")
  },
  {
    path: '/home',
    name: 'home',
    component: () => import("../views/HomeView.vue")
  },
  {
    path: '/addnewct',
    name: 'addnewct',
    component: () => import("../views/AddNewCt.vue")
  },
  {
    path: '/addmatter',
    name: 'addmatter',
    component: () => import("../views/AddMatter.vue")
  },
  {
    path: '/detailct',
    name: 'detailct',
    component: () => import("../views/DetailCt.vue")
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/warn',
    name: 'warn',
    component: () => import("../views/Warn.vue")
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// router.beforeEach((to) =>{
//   const token = localStorage.getItem("token")
//   if(!token){
//     return "/login"
//   }

// })

export default router
