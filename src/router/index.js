import Vue from 'vue'
import VueRouter from 'vue-router'
import Todos from '../views/Todos.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Todos',
    component: Todos
  },
  {
    path: '/change-todo/:id',
    name: 'Change',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Change.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
