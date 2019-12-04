/**
 * This creates our Vue object and connects its router,storage, and render to
 * the object. It then calls the $mount function to mount the vue to the
 * webpage. At some point during this time, created is called which gets some
 * data from the API to be used throughout the app's lifetime.
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.config.productionTip = false;

Vue.use(Buefy);

new Vue({
  router,
  store,
  render: h => h(App),

  /**
   * Globally accessible methods
   */
  methods: {
    encode_input_string(str) {
      return str
        .trim()
        .replace(/ |_/gi, "-")
        .toLowerCase();
    }
  }
}).$mount("#app");
