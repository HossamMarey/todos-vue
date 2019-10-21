<template>
  <div class="register">
    <div class="container">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="col-10 col-md-6 col-lg-4 mt-4">
          <!-- ////////////////// -->

          <div class="card">
            <div class="card-header">
              <div class="btn-group">
                <button
                  type="button"
                  class="btn"
                  :class="{active: formType.type == 'login' }"
                  @click="changeType('login')"
                >Log In</button>
                <button
                  type="button"
                  class="btn"
                  :class="{active: formType.type == 'signup' }"
                  @click="changeType('signup')"
                >Sign Up</button>
              </div>
            </div>
            <div class="card-body">
              <!-- <h5 class="card-title text-center">Sign up</h5>
              <hr />-->
              <!-- ---------------- -->
              <form>
                <div class="form-group">
                  <label>Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Enter email"
                    v-model.trim="userData.email"
                    @blur="validUser('email', userData.email)"
                    :class="{invalid: msg.email}"
                  />
                </div>
                <div class="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    class="form-control"
                    placeholder="Password"
                    v-model.trim="userData.password"
                    @blur="validUser('password', userData.password)"
                    :class="{invalid: msg.password}"
                  />
                </div>
                <div class="error text-center" v-if="msg.email">{{msg.email}}</div>
                <div class="error text-center" v-if="msg.password">{{msg.password}}</div>
                <div class="error text-center" v-if="errMsg">{{errMsg}}</div>
                <button type="submit" class="btn" @click.prevent="register">{{formType.title}}</button>
                <!-- <small class="form-text text-muted">We'll never share your email with anyone else.</small> -->
              </form>
              <!-- ---------------- -->
            </div>
          </div>
          <div class="dum-data">
            <small class="text-center">use this data</small>
            <small class="text-center">email: test@test.com, password: 123456</small>
            <small class="text-center">or create a new account</small>
          </div>

          <!-- /////////////// -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      userData: {
        type: "login",
        email: null,
        password: null
      },
      formType: {
        type: "login",
        title: "Log in" // "Sign up"
      },
      msg: {
        email: null,
        password: null
      }
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    errMsg() {
      return this.$store.getters.getErrorMsg;
    }
  },
  methods: {
    changeType(type) {
      this.typeChanger(type);
    },
    typeChanger(type) {
      if (type == "signup") {
        this.formType.type = "signup";
        this.formType.title = "Sign up";
        this.userData.type = "signup";
        this.$router.push({ path: "/register/signup" }).catch(err => {});
      } else {
        this.formType.type = "login";
        this.formType.title = "Log in";
        this.userData.type = "login";
        this.$router.push({ path: "/register/login" }).catch(err => {});
      }
    },
    validUser(type, val) {
      // email validation ///
      if (type == "email") {
        this.msg.email = null;
        if (!val) {
          this.msg.email = "email is Required!";
        } else {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!re.test(String(val).toLowerCase())) {
            this.msg.email = "Plz enter a valid email";
          }
        }
      }
      // password validation ///
      if (type == "password") {
        this.msg.password = null;
        if (!val) {
          this.msg.password = "password is Required!";
        } else {
          let passArr = val.split("");
          if (passArr.length < 6) {
            this.msg.password = "Passwords must be at least 6 characters";
          }
        }
      }
    },
    isValid() {
      if (this.userData.email && this.userData.password) {
        if (!this.msg.email && !this.msg.password) {
          return true;
        }
      }
    },
    register() {
      ///// add user or login ///////
      if (this.isValid()) {
        this.$store.dispatch("addUserAc", this.userData);
        console.log(this.errMsg);
      }
    },
    redirectUser() {
      this.$router.push({ path: "/dashboard/1" });
    }
  },
  created() {
    let idtype = this.$route.params.reg;
    this.typeChanger(idtype);
  },
  updated() {
    if (this.errMsg) {
    }
  },
  watch: {
    user: function(val) {
      if (val != null) {
        this.redirectUser();
      }
    },
    errMsg: function(val) {
      console.log(val);
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  .row {
    height: 90vh;
    // max-height: 450px;
  }
  .card {
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
    .btn {
      background-color: rgb(98, 109, 119);
      // c4b3b3
      color: #fff;
      padding: 10px 30px;
      box-shadow: none;

      &:hover {
        background-color: rgb(36, 40, 44);
      }
      &:focus {
        box-shadow: none;
      }
    }
    .active {
      background-color: #343a40;
    }
    .card-header {
      padding: 0;
      .btn-group {
        width: 100%;
        opacity: 0.8;
      }
    }
    .card-body {
      h5 {
        color: rgb(22, 23, 24);
        font-size: 18px;
        margin: 10px 0 0 0;
      }
      hr {
        margin: 10px auto;
        width: 100px;
        background-color: #cf4a47;
        text-align: center;
      }
      form {
        margin: 10px 20px;
        margin-top: 30px;
        .btn {
          background-color: #cf4a47;
          width: 100%;
          margin-top: 20px;
        }
        .error {
          color: rgba(202, 97, 78, 0.616);
          font-size: 14px;
        }
        .invalid {
          border-color: #cf4a47;
        }
      }
    }
  }
  .dum-data {
    width: 100%;
    small {
      width: 100%;
      display: block;
    }
  }
}
</style>