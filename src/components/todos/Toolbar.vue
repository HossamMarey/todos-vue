<template>
  <div
    class="btn-toolbar"
    role="toolbar"
    aria-label="Toolbar with button groups"
    v-if="shownNo > 10"
  >
    <div class="btn-group mr-2" role="group" aria-label="First group">
      <button
        type="button"
        class="btn btn-secondary"
        @click="changePage(-1)"
        :disabled="pageNo == 1"
      >
        <i class="icon ion-md-arrow-dropleft"></i>
      </button>
      <button type="button" class="btn btn-secondary">{{ pageNo }}</button>
      <button type="button" class="btn btn-secondary" @click="changePage(1)" :disabled="lastPage">
        <!-- :disabled="lastPage" -->
        <i class="icon ion-md-arrow-dropright"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  data() {
    return {
      lastPage: false
    };
  },
  computed: {
    pageNo() {
      return this.$store.getters.getPageNo;
    },
    shownNo() {
      return this.$store.getters.getShownNo;
    }
  },
  methods: {
    changePage(val) {
      let pNo = this.pageNo;
      let maxNo = this.pageNo * 10;

      // disable btns
      if (this.shownNo < maxNo + 10) {
        this.lastPage = true;
      } else if (this.shownNo > maxNo) {
        this.lastPage = false;
      }

      // Pages Counter
      if (val == 1 && maxNo < this.shownNo) {
        pNo = pNo + 1;
      } else if (val == -1 && pNo > 1) {
        pNo = pNo - 1;
        this.lastPage = false;
      }
      // this.$route.params.pageNo = this.pageNo
      this.$router
        .push({ name: "dashboard", params: { pageNo: pNo } })
        .catch(err => {});

      this.$store.dispatch("addPageNoAc", pNo);
      this.$store.dispatch("getTodos");
    }
  }
};
</script>

<style>
</style>