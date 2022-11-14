/* eslint-disable no-console */

import { register } from 'register-service-worker'
import { Widget } from "@/functions/widget"

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated(registeration) {
      console.log('New content is available; please refresh.')
      registeration.update()

      caches.keys().then(function (names) {
        for (let name of names) caches.delete(name);
      });
      window.location.reload()
    },
    offline() {
      Widget.toast("No Internet Connection")
      console.log('No internet connection found. App is running in offline mode.')
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
