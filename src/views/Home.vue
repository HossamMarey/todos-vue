<template>
  <div class="home">
    <div class="container mt-4">
      <div class="row">
        <div class="col-12 col-md-4 home-cta">
          <h2>
            Organize life
            <strong>Then go enjoy it…</strong>
          </h2>
          <p>Todo helps people feel more in control of their lives , so you can get it all done and enjoy more peace of mind along the way.</p>
          <button class="btn" @click="$router.push({path: '/register/signup'})">SignUp</button>
        </div>
        <div class="col-12 col-md-8">
          <div class="home-imgs">
            <img class="bg" src="../assets/img/home-bg.svg" alt="home todos" />
            <img class="tasks" src="../assets/img/home-tasks.svg" alt="home todos" />
            <img class="people" src="../assets/img/home-people.svg" alt="home todos" />
          </div>
        </div>
      </div>
    </div>

    <MainFooter/>
  </div>
</template>

<script>
import MainFooter from "../components/MainFooter";
export default {
  name: "home",
  components: { MainFooter },
};
</script>
<style lang="scss" scoped>
.home {
  .home-cta {
    margin-top: 100px;
    h2 {
      font-size: 38px;
      strong {
        display: block;
        color: #cf4a47;
      }
    }
    .btn {
      background-color: #cf4a47;
      color: #fff;
      border-radius: 50px;
      padding: 10px 30px;
      &:hover {
        background-color: rgb(177, 62, 60);
      }
      &:focus {
        box-shadow: none;
      }
    }
    p {
      color: #343a40;
      margin: 20px 0;
    }
  }

  .home-imgs {
    position: relative;
    height: 460px;
    margin: 20px 0;

    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
    }
    .tasks {
      height: 300px;
      top: 125px;
      transform: translateX(-40%);
      animation-name: slideInDown;
      animation-duration: 2s;
      // animation-fill-mode: both;
      animation-direction: alternate-reverse;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }
    .people {
      height: 220px;
      bottom: 0;
    }
    .bg {
      height: 420px;
      top: 0;
    }
  }
}
.container {
  overflow: hidden;
}

@keyframes slideInDown {
  0% {
    transform: translate(-40%,-3%);
    visibility: visible;
  }
  50% {
    transform: translateY(-40%,1);
  }
  100% {
    transform: translateY(-40%,-3%);
  }
}

/// tablet ///////
@media (max-width: 768px) {
  .home {
    .home-imgs {
      height: 300px;
      margin: 15px 0 !important;

      .tasks {
        height: 220px;
        top: 70px;
      }
      .people {
        height: 180px;
        bottom: 0;
      }
      .bg {
        height: 280px;
        top: 0;
      }
    }
    .home-cta {
      margin-top: 20px;
      margin-right: 0 !important;
      h2 {
        font-size: 24px;
      }
    }
  }
}

/// mobile ///////

@media (max-width: 579px) {
  .home {
    .home-imgs {
      height: 260px;
      margin: 20px 0;
      margin-right: 0;
      .tasks {
        height: 180px;
        top: 70px;
      }
      .people {
        height: 150px;
        bottom: 0;
      }
      .bg {
        height: 230px;
        top: 0;
      }
    }
  }
  .home-cta {
    margin: 20px auto;
    text-align: center;
    h2 {
      font-size: 32px !important;
    }
    p {
      padding: 0 20px;
    }
  }
}
</style>
