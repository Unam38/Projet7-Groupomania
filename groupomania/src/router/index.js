import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store'
import Login from '@/components/modales/Login.vue'
import Register from '@/components/modales/Register.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
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
    path: '/Profile',
    name: 'Profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login'
        })
      }
      next()
    }
  },
  {
    path: '/Administration',
    name: 'Administration',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Administration.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login'
        })
      }
      next()
    }
  },
  {
    path: '/NewArticle',
    name: 'NewArticle',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/NewArticle.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login'
        })
      }
      next()
    }
  },
  {
    path: '/article/:id',
    name: 'Article',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Article.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login'
        })
      }
      next()
    }
  },
  {
    path: '/UpdateProfile/:id',
    name: 'UpdateProfile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../components/modales/UpdateProfile.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login'
        })
      }
      next()
    }
  },
  {
    path: '/UpdateComment/:id',
    name: 'UpdateComment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../components/modales/UpdateComment.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login'
        })
      }
      next()
    }
  },
  {
    path: '/UpdateArticle/:id',
    name: 'UpdateArticle',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../components/modales/UpdateArticle.vue"),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'Login'
        })
      }
      next()
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
