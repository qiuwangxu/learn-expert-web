import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router/index';
import { createStore } from './store/index';
import { sync } from 'vuex-router-sync';

export function createApp () {

  const router = createRouter()
  const store = createStore()

  sync(store, router)

  const app = new Vue ({
    store,
    router,
    render: h => h(App)
  })
  return { app, router, store }
}

