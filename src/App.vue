<template>
  <div id="app">
    <MainHeader />
    <router-view />
    
  </div>
</template>
<script>
import MainHeader from "./components/MainHeader";


export default {
  components: { MainHeader },
  computed: {
    user() {
      return this.$store.getters.getUser;
    }
  },
  watch: {
    user: function() {
      if (this.user != null || this.user != undefined) {
        this.$store.dispatch("getTodos");
      }
    }
  },
  created() {}
};
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #e9ecf0;
}
</style>
