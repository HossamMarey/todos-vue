<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link :to="{name: 'home'}" class="navbar-brand">ToDo Vue</router-link>
        <button class="navbar-toggler" type="button" @click.stop="navCollapse">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" :class="{show: !collapsed}">
          <ul class="navbar-nav ml-auto" :class="{'text-right': !collapsed}">
            <router-link
              tag="li"
              active-class="active"
              :to="{path: `/dashboard/${pageNo}`}"
              class="nav-item"
              v-if="user"
            >
              <a class="nav-link">Dashboard</a>
            </router-link>
            <router-link
              tag="li"
              active-class="active"
              :to="{path: '/register/login'}"
              class="nav-item"
              v-if="!user"
            >
              <a class="nav-link">Register</a>
            </router-link>
            <router-link
              tag="li"
              :to="{path: '/'}"
              class="nav-item"
              v-if="user"
            >
              <a class="nav-link" @click="logOut">Log Out</a>
            </router-link>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  data() {
    return {
      collapsed: true
    };
  },
  computed: {
    pageNo() {
      return this.$store.getters.getPageNo;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  methods: {
    navCollapse() {
      this.collapsed = !this.collapsed;
    },
    logOut() {
      this.$store.dispatch("logOutAc");
    }
  },
  watch: {
    $route: function() {
      let pNo = this.$route.params;
      // this.$store.dispatch("addPageNoAc", pNo);
    },
    // user: function(val) {
    //   console.log(val);
    // }
  },
  created() {
    if (typeof +this.$route.params.pageNo == !NaN) {
      let pNo = +this.$route.params.pageNo;
      this.$store.dispatch("addPageNoAc", pNo);
    }
  }
};
</script>

<style>
</style>