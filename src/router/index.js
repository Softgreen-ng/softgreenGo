import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'
import ErrorPage from '@/views/ErrorPage'
import store from "../store"
import { createToaster } from "@meforma/vue-toaster";

var toast = createToaster({
  position: "top",
  maxToasts: 1,
  opacity: .8
}
)
const redirectIfAuthenticated = () => {
  if (store.getters.auth) {
    createToaster({}).show(`User already logged in`);
    return {
      path: "/"
    }
  }
}


const redirectIfNotAuthenticated = () => {
  if (!store.getters.auth) {
    toast.show("User needs to be authenticated")
    return {
      path: "/login"
    }
  }
}



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      transition: 'slide-right',
      title:"SoftGreen Go, Fresh at your fingertips"
    },
  },
  // {
  //   path: '/homepage',
  //   name: 'HomePage',
  //   component: Home,
  //   meta: {
  //     transition: 'slide-right'
  //   },
  // },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/Signup.vue'),
    beforeEnter(to, from) {
			to.params.continue = from.path ?? '' 
      const red = redirectIfAuthenticated
      if(red)
      return red
		},
    meta: {
      title:"Signup"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: {
      title:"Login"
    },
    beforeEnter(to, from) {
			to.params.continue = from.path ?? '' 
      const red = redirectIfAuthenticated
      if(red)
      return red
		}

  },
  {
    path: '/recover',
    name: 'ForgotPassword',
    component: () => import('@/views/password/ForgotPassword.vue'),
    beforeEnter: redirectIfAuthenticated,
    meta: {
      title:"Forogot Password"
    }

  },
  {
    path: '/recover/sent',
    name: 'ResetPasswordSent',
    component: () => import('@/views/success/ForgotPasswordSent.vue'),
    beforeEnter: redirectIfAuthenticated,
    meta: {
      title:"Email Sent"
    }

  },
  {
    path: '/recover/:id/:token',
    name: 'Reset Password',
    component: () => import('@/views/password/RecoverPassword.vue'),
    beforeEnter: redirectIfAuthenticated,
    meta: {
      title:"ResetPassword"
    }

  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: () => import('@/views/Welcome.vue'),
    meta: {
      title:"Welcome"
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/Cart.vue'),
    meta: {
      title:"Cart"
    }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/views/Checkout.vue'),
    beforeEnter: redirectIfNotAuthenticated,
    meta: {
      title:"Complete your order"
    }
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import('@/views/Payment.vue'),
    beforeEnter: redirectIfNotAuthenticated,
    meta: {
      title:"Payment"
    }
  },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: () => import('@/views/Dashboard.vue'),
  // },
  {
    path: '/product/:id',
    name: 'SingleProduct',
    component: () => import('@/views/ProductPage.vue'),
    meta: {
      title:""
    }

  },

  // POLICIES
  {
    path: '/policy',
    name: 'Policy',
    component: () => import('@/views/policy/Policy.vue'),
    meta: {
      title:"Policy"
    }
  },
  {
    path: '/order/completed',
    name: 'OrderComplete',
    component: () => import('@/views/success/Order.vue'),
    meta: {
      title:"Your Order has been recieved"
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import('@/views/Order.vue'),
    beforeEnter: redirectIfNotAuthenticated,
    meta: {
      title:"Order"
    }
  },
  {
    path: '/profile/edit',
    name: 'EditProflie',
    component: () => import('@/views/EditProfile.vue'),
    beforeEnter: redirectIfNotAuthenticated,
    meta: {
      title:"Edit Profile"
    }
  },
  {
    path: '/profile',
    name: 'Proflie',
    component: () => import('@/views/Profile.vue'),
    beforeEnter: redirectIfNotAuthenticated,
    meta: {
      title:"Profile"
    }
  },
  {
    path: '/request',
    name: 'Request',
    component: () => import('@/views/Request.vue'),
    meta: {
      title:"Request"
    }
  },
  {
    path: '/request/success',
    name: 'RequestSuccess',
    component: () => import('@/views/success/Request.vue'),
    meta: {
      title:"Request Successful"
    }
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
    meta: {
      title: "It got Spoilt"
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => { 
  document.title = to.meta.title ?? document.title;
  return true;
})

export default router