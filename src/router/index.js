import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import ErrorPage from '@/views/ErrorPage'
import store from "../store"
import { createToaster } from "@meforma/vue-toaster";

const redirectIfAuthenticated = () => {
  if(store.getters.auth){
    createToaster({}).show(`User needs to be authenticated`);
    return {
      path:"/"
    }
  }
}


const redirectIfNotAuthenticated = () => {
  if(!store.getters.auth){
    return {
      path:"/login"
    }
  }
}
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      transition: 'slide-right'
    },
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: Home,
    meta: {
      transition: 'slide-right'
    },
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/Signup.vue'),
    beforeEnter: redirectIfAuthenticated
  },
  {
    path: '/signup/:continue',
    name: 'SignUpAndContinue',
    component: () => import('@/views/Signup.vue'),
    beforeEnter: redirectIfAuthenticated
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    beforeEnter: redirectIfAuthenticated

  },
  {
    path: '/login/:continue',
    name: 'LoginAndContinue',
    component: () => import('@/views/Login.vue'),
    beforeEnter: redirectIfAuthenticated
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('@/views/Welcome.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/Checkout.vue'),
    beforeEnter: redirectIfNotAuthenticated
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('@/views/Payment.vue'),
    beforeEnter: redirectIfNotAuthenticated
  },
  {
    path: '/faq',
    name: 'Faq',
    component: () => import('@/views/Faq.vue')
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('@/views/Dashboard.vue'),
  // },
  {
    path: '/product/:id',
    name: 'SingleProduct',
    component: () => import('@/views/ProductPage.vue')
  },

  // POLICIES
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('@/views/policy/Policy.vue')
  },
  {
    path: '/route',
    name: 'Route',
    component: () => import('@/views/Route.vue')
  },
  {
    path: '/order/completed',
    name: 'OrderComplete',
    component: () => import('@/views/success/Order.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order.vue'),
    beforeEnter: redirectIfNotAuthenticated
  },
  {
    path: '/request',
    name: 'Request',
    component: () => import('@/views/Request.vue')
  },
  {
    path: '/request/success',
    name: 'RequestSuccess',
    component: () => import('@/views/success/Request.vue')
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('@/views/policy/Term.vue')
  },

  {
    path: '/comingsoon',
    name: 'ComingSoon',
    component: () => import('@/views/ComingSoon.vue')
  },

  // Must Always be at bottom
  {
    path: "/:catchAll(.*)",
    name: 'ErrorPage',
    component: ErrorPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router