/**
 * This file mimics the data state per each user/machine
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API_URI: "http://localhost:26657"
    // For integration:
    //API_URI: "http://mockta4flask-env.us-east-1.elasticbeanstalk.com",
  }
});
