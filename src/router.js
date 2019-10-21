import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Dashboard from "./views/Dashboard";
import Register from "./views/Register.vue";
import store from './store';

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL || '/demo/todos',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/dashboard",
      redirect: "/dashboard/1"
    },
    {
      path: "/dashboard/:pageNo",
      name: "dashboard",
      component: Dashboard,
      beforeEnter : (to, from, next) => {
        if(store.getters.getUser != null || store.getters.getUser != undefined){
          next();
        } else {
          next("/register/login");
        }
        
      }
    },
    {
      path: "/register/:reg",
      name: "register",
      component: Register
    },
    // {
    //   path: "/dashboard/:pageNo",
    //   component: Dashboard
    // }
  ]
});
