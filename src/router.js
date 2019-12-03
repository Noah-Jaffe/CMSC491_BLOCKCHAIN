/**
 * This file handles the routes and which vues to display for them
 */
import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      title: "Home",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "produce" */ "@/views/Home.vue")
    },
    {
      // redirect all other unknowns to a 404 not found page
      path: "*",
      name: "404",
      title: "404",
      component: () =>
        import(/* webpackChunkName: "consume" */ "@/views/NotFound.vue")
    }
  ]
});
