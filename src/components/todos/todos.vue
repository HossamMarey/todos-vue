<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-10 col-md-8">
        <div class="input-group mb-2">
          <input type="text" class="form-control" placeholder="Todo ..." v-model="title" />
          <div class="input-group-apend">
            <button class="btn btn-dark" @click="addNewTodo">Add a ToDo</button>
          </div>
        </div>
      </div>
    </div>
    <filterTodo />
    <div class="mb-3"></div>
    <!-- loooooooooooop -->
    <transition-group class="row" tag="div" name="slide" mode="out-in">
      <div
        class="col-10 col-md-8 bg-light todo"
        :class="{'todo-done': todo.completed, 'd-none': compFilterType(todo.completed)}"
        v-for="todo in todos"
        :key="todo.id"
      >
        <div class="td-group">
          <input
            type="checkbox"
            class="todo-check"
            :checked="todo.completed"
            @click="upCond({id: todo.id, title: todo.title, completed: !todo.completed })"
          />
          <h2 v-if="todo.id != clickedId">{{ todo.title }}</h2>
          <input type="text" v-model="eTitle" v-if="todo.id == clickedId" />
        </div>
        <div class="td-group">
          <i class="icon ion-md-trash" @click="deleteTodo(todo.id)"></i>
          <i class="icon ion-md-create" @click="changeMode(todo)" v-if="todo.id != clickedId"></i>
          <i class="icon ion-md-checkmark" @click="editCurTodo(todo)" v-if="todo.id == clickedId"></i>
        </div>
      </div>
    </transition-group>
    <div class="m-4">
      <div class="d-flex justify-content-center">
        <Toolbar />
      </div>
    </div>
  </div>
</template>

<script>
import FilterTodo from "./FilterTodo";
import Toolbar from "./Toolbar";
import { mapActions } from "vuex";
export default {
  name: "Todos",
  components: { FilterTodo, Toolbar },
  data() {
    return {
      count: 1,
      title: null,
      clickedId: "",
      eTitle: null,
      chngedTodo: null,
      nativeTodos: null,
      compFilter: null
    };
  },
  methods: {
    ...mapActions(["deleteTodo", "updateCond"]),
    addNewTodo() {
      if (this.title) {
        this.$store.dispatch("postTodos", {
          title: this.title,
          completed: false
        });
      }
      this.title = null;
    },
    changeMode(todo) {
      this.eTitle = todo.title;
      this.clickedId = todo.id;
    },
    editCurTodo(todo) {
      let newTodo = todo;
      newTodo.title = this.eTitle;
      this.$store.dispatch("updateTodo", newTodo);
      this.clickedId = "";
    },
    upCond(todo) {
      this.$store.dispatch("updateCond", todo);
      this.chngedTodo = "c";
    },
    compFilterType(completed) {
      //all completed notCompleted
      if (this.compFilter == "all") {
        return false;
      } else if (this.compFilter == "completed") {
        return !completed; //completed
      } else if (this.compFilter == "notCompleted") {
        return completed;
      }
      // return 'all'
    },
    // type all completed notCompleted
    filterTypes(todos) {
      if (this.filteredTodos.comp == "completed") {
        return todos.filter(el => {
          return el.completed == true;
        });
      } else if (this.filteredTodos.comp == "notCompleted") {
        return todos.filter(el => {
          return el.completed == false;
        });
      } else {
        return todos;
      }
    },
    // order todos
    filterOrder(todos) {
      if (this.filteredTodos.order == "new") {
        return todos.reverse();
      } else if (this.filteredTodos.order == "old") {
        return todos;
      }
    },
    // search todos
    filterSearch(todos) {
      if (this.searchTodos) {
        return todos.filter(el => {
          return el.title
            .toLowerCase()
            .includes(this.searchTodos.toLowerCase());
        });
      } else {
        return todos;
      }
    },
    // filter acc PageNo
    filterPageNo(todos) {
      let start = 0;
      let end = 10;
      let pno = this.pageNo;
      const showNo = 10;

      if (pno == 1) {
        start = 0;
        end = 10;
      } else {
        start = pno * showNo - showNo;
        end = pno * showNo;
      }
      return todos.slice(start, end);
    }
  },
  computed: {
    allTodos() {
      return this.$store.getters.natTodos;
    },
    searchTodos() {
      return this.$store.getters.getSrTodos;
    },
    // compFilter() {
    //   return this.$store.getters.compTodos;
    // },
    pageNo() {
      return this.$store.getters.getPageNo;
    },
    filteredTodos() {
      return this.$store.getters.gfilteredTodos;
      // comp: all completed notCompleted / order: new old
    },
    todos() {
      this.nativeTodos = this.allTodos;

      // order todos new old
      this.nativeTodos = this.filterOrder(this.allTodos);

      // type all completed notCompleted
      this.nativeTodos = this.filterTypes(this.nativeTodos);

      // if pageNo search
      this.nativeTodos = this.filterSearch(this.nativeTodos);
      if (this.searchTodos) {
        this.$router
          .push({
            query: Object.assign({}, this.$route.query, {
              search: this.searchTodos
            })
          })
          .catch(err => {});
      } else {
        let query = Object.assign({}, this.$route.query);
        delete query.search;
        this.$router.replace({ query }).catch(err => {});
      }

      // add Shown Number
      let shown = this.nativeTodos.length;
      this.$store.dispatch("addShownNoAc", shown);

      // pageNo filter
      this.nativeTodos = this.filterPageNo(this.nativeTodos);

      return this.nativeTodos;
    }
  },
  updated() {
    // console.log(this.pageNo)
    // this.allTodos = this.$store.getters.todos;
  }
};
</script>

<style scoped>
.slide-enter-active {
  animation: slideIn 0.5s;
}
.slide-leave-active {
  animation: slideIn 0.5s reverse;
}
@keyframes slideIn {
  0% {
    transform: translateX(-500px);
  }
  100% {
    transform: translateX(0);
  }
}
.d-none {
  display: none;
}
.todo {
  border-radius: 6px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.1);
  margin: 10px auto;
  padding: 10px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.todo:hover {
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.13);
  background-color: #fff !important;
}
.todo-done {
  background-color: #343a40 !important;
  color: #fff;
}
.todo-done:hover {
  background-color: rgb(77, 86, 95) !important;
  color: #fff;
}
.todo-done i {
  color: rgb(211, 211, 211);
}
.td-group {
  display: flex;
  align-items: center;
}

.todo-check {
  width: 20px;
  height: 20px;
  position: relative;
  margin-right: 20px;
}
.todo-check::before {
  content: "";
  cursor: pointer;
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  left: 0;
  background: #eee;
  border: 1px solid #ddd;
}
.todo-check:checked:after {
  content: "";
  cursor: pointer;
  position: absolute;
  width: 11px;
  height: 5px;
  background: transparent;
  top: 30%;
  left: 25%;
  border: 2px solid #555;
  border-top: none;
  border-right: none;
  transform: rotate(-50deg);
}
h2 {
  padding: 5px 0;
  display: inline-block;
  font-size: 20px;
  line-height: 100%;
  transform: translateY(4px);
}
i {
  color: rgb(58, 58, 58);
  margin: 0 5px 0 10px;
  cursor: pointer;
  font-size: 20px;
}
i:hover {
  color: rgb(112, 116, 124);
}
</style>