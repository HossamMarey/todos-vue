import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app';


/// firebase /////
const configOptions = {
  apiKey: "AIzaSyC4MuvG0mri7A3lqcfnmyljfcoydep1s0g",
  authDomain: "https://vue-chat-axios.firebaseio.com",
  databaseURL: "https://vue-chat-axios.firebaseio.com",
  projectId: "vue-chat-axios",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

firebase.initializeApp(configOptions);

//////////////

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



