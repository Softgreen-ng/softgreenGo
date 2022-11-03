import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Icon } from '@iconify/vue'
import Toaster from "@meforma/vue-toaster";
import VueLoading from 'vue-loading-overlay';

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import Tooltip from 'primevue/tooltip';


import "primevue/resources/primevue.min.css"           //core css
import "primeicons/primeicons.css"
import "primevue/resources/themes/lara-light-blue/theme.css"


/*

Yet-to-be uninstalled*\
v-calendar
'vue-functional-calendar'

*/
import VCalendar from 'v-calendar';
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// CSS
import 'animate.css'
import '@/themes/bootstrap/css/bootstrap.min.css'
import '@/themes/bootstrap/css/bootstrap.css'
import '@/themes/variables.css'
import '@/themes/styles.less'
import '@/themes/fonts.css'
import 'v-calendar/dist/style.css'
import 'vue-loading-overlay/dist/vue-loading.css';
import './registerServiceWorker'


createApp(App)
.directive('tooltip', Tooltip)
.use(store)
.use(router)
.use(VCalendar)
.use(VueLoading)
.use(PrimeVue,  {ripple: true})
.use(ConfirmationService)
.use(Toaster, {
    position: "top",
    maxToasts:1,
    opacity:.8
})
.component('app-header', Header)
.component('app-footer', Footer)
.component('icon', Icon)
.mount('#app')
