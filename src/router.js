import Vue from 'vue'
import VueRouter from 'vue-router'

/*
 |--------------------------------------------------------------------------
 | Views
 |--------------------------------------------------------------------------|
 */

// Users

import UserIndex from './views/users/Index.vue'
import UserCreate from './views/users/Create.vue'

Vue.use(VueRouter)

const routes = [
  /*
   |--------------------------------------------------------------------------
   | Users
   |--------------------------------------------------------------------------|
   */
  {
    path: '/',
    component: UserIndex,
  },
  {
    path: '/create',
    component: UserCreate,
  },
  {
    path: '/edit/:id',
    component: UserCreate,
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active',
})

export default router
