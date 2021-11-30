import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)

export function createRouter () {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/home',
                component: ()=> import('../components/home.vue')
            },
            {
                path: '/item',
                component: ()=> import('../components/home.vue')
            },
            {
                path: '*',
                component: resolve => require(['../components/home.vue'], resolve)
            }
        ]
    })
}