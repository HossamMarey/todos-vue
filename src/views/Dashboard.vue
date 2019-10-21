<template>
  <div class="dashboard">
    <div class="container mt-4">
      <!-- <div> search todos </div> -->

      <Todos />
    </div>
  </div>
</template>

<script>
import Todos from "../components/todos/todos";
export default {
  name: "dashboard",
  components: { Todos },
  data() {
    return {
      pageNo: 1
    };
  },
  computed: {
    user(){
      return this.$store.getters.getUser
    }
  }
};
</script>
