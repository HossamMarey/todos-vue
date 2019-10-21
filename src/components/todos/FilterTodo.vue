<template>
  <div>
    <div class="row justify-content-center mt-4">
      <div class="col-10 col-md-8">
        <div class="filter-bar">
          <ul class="nav">
            <div>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" role="button" @click="openDrop">{{ dropTitle }}</a>

                <div class="dropdown-menu" :class="{show: dropOpened}">
                  <a class="dropdown-item" @click="orderTodos('new')">New Todos</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" @click="orderTodos('old')">Old Todos</a>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" role="button" @click="openComp">{{ compTitle }}</a>

                <div class="dropdown-menu" :class="{show: compOpened}">
                  <a class="dropdown-item" @click="orderComp('all')">All Todos</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" @click="orderComp('completed')">Completed</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" @click="orderComp('notCompleted')">Not Completed</a>
                </div>
              </li>
            </div>
            <div>
              <!-- <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>-->

              <div class="input-group input-group-sm search-bar">
                <input
                  type="text"
                  class="form-control"
                  v-model="search"
                  placeholder="search"
                  @input="searchTodos"
                />
                <i class="icon ion-md-search"></i>
              </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FilterTodo",
  data() {
    return {
      dropTitle: "New Todos",
      compTitle: "All Todos",
      dropOpened: false,
      compOpened: false,
      search: null
    };
  },
  methods: {
    openDrop() {
      this.dropOpened = !this.dropOpened;
    },
    openComp() {
      this.compOpened = !this.compOpened;
    },
    searchTodos() {
      if (!this.search) {
        this.search = null;
      }
      this.$store.dispatch("searchTodosAc", this.search);
    },
    orderTodos(cond) {
      this.$store.dispatch("orderTodosAc", cond);
      if (cond == "new") {
        this.dropTitle = "New Todos";
      } else if (cond == "old") {
        this.dropTitle = "Old Todos";
      }
      this.$store.dispatch("getTodos");
      this.dropOpened = !this.dropOpened;
    },
    orderComp(cond) {
      this.$store.dispatch("orderCompAc", cond);
      if (cond == "all") {
        this.dropTitle = "All Todos";
      } else if (cond == "completed") {
        this.dropTitle = "Completed";
      } else if (cond == "notCompleted") {
        this.dropTitle = "Not Completed";
      }
      this.$store.dispatch("getTodos");
      this.compOpened = !this.compOpened;
    }
  },
  computed:{
    qSearch() {
      // return this.$route.query.search
      // this.search = this.$route.query.search
    }
  }
};
</script>

<style scoped>
.search-bar {
  position: relative;
}
.search-bar i {
  position: absolute;
  right: 10px;
  top: 6px;
  color: rgb(118, 129, 139);
  font-size: 18px;
}
.search-bar input {
  margin-top: 4px;
  border-radius: 5px !important;
  background-color: rgb(221, 227, 233);
}
.search-bar input:focus {
  border: 2px solid rgb(65, 70, 75);
  box-shadow: none !important;
}
.filter-bar {
  border-radius: 6px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.1);
  color: #fff;
  background-color: rgb(118, 129, 139);
  margin: 0 auto;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.filter-bar ul {
  width: 100%;
  display: flex !important;
  justify-content: space-between !important;
}
.filter-bar ul > div {
  display: flex;
}
a {
  color: #fff;
  cursor: pointer;
}
</style>