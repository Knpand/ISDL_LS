import Vue from 'vue'
import VueRouter from 'vue-router'

// compornent

import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import bookserch from '../components/bookserch.vue'
import SignupForm from'../components/SignupForm.vue'
import rental from '../components/rental.vue'
import userinfo from '../components/userinfo.vue'
import Bookadd from '../components/Bookadd.vue'
import signup from '../components/SignUp.vue'
import firebase from "../firebase.js"

Vue.use(VueRouter)

const routes = [
  {
    name: 'SignupForm',
    path: '/',
    component: SignupForm
  },
  {
    name:'Bookadd',
    path:'/Bookadd',
    component:Bookadd
  },
  {
    name: 'SignUp',
    path: '/SignUp',
    component:signup
  },
  {
    name: 'Login',
    path: '/login',
    components: {
      default:Login
    }
  },
  {
    name: 'Home',
    path: '/home',
    components: {
      default:Home
    },
    meta: { requiresAuth: true }
  },
  {
    name: 'bookserch',
    path: '/bookserch',
    components: {
      default:bookserch
    }
  },
  {
    name:'rental',
    path:'/rental',
    components: {
      default:rental
    }

  },
  {
    name:'userinfo',
    path:'/userinfo',
    components:{
      default:userinfo
    },
    meta: { requiresAuth: true }
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router