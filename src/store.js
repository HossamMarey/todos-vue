import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import * as firebase from "firebase";

Vue.use(Vuex);

// https://vue-chat-axios.firebaseio.com/todos.json
var url = "https://vue-chat-axios.firebaseio.com";

// console.log(store.state.user)


 export default new Vuex.Store({
  state: {
    todos: [],
    pageNumber: 1,
    searchWord: null,
    fTodos: [],
    filteredType: {
      comp: "all", //all completed notCompleted
      order: "new" // new old
    },
    shownNo: null,
    appQuery: { pageNo: 1, search: null },
    user: null,
    errMsg: null
  },
  getters: {
    natTodos(state) {
      return state.todos;
    },
    compTodos(state) {
      return state.filteredType.comp;
    },
    gfilteredTodos(state) {
      return state.filteredType;
    },
    getPageNo(state) {
      return state.pageNumber;
    },
    getSrTodos(state) {
      return state.searchWord;
    },
    getShownNo(state) {
      return state.shownNo;
    },
    getAppQuery(state) {
      return state.appQuery;
    },
    getUser(state){
      return state.user;
    },
    getErrorMsg(state){
      return state.errMsg;
    }
  },
  mutations: {
    addTodo(state, newTodo) {
      // state.todos.push(newTodo);
      this.dispatch("getTodos");
    },
    addTodos(state, res) {
      let adTodos = [];
      let todos = res.data;
      for (let key in todos) {
        let todo = todos[key];
        todo.id = key;
        adTodos.push(todo);
      }
      state.todos = adTodos;
    },
    delTodo(state, id) {
      // const newTodos = state.todos.filter(el => {
      //   return el.id != id;
      // });
      // state.todos = newTodos;
      this.dispatch("getTodos");
    },
    upCond(state, todo) {
      // state.todos[todo.id].completed = !todo.completed;
      this.dispatch("getTodos");
    },
    orderTd(state, cond) {
      if (state.filteredType.order != cond) {
        state.filteredType.order = cond;
        state.todos = state.todos.reverse();
      }
    },
    orderComp(state, cond) {
      if (state.filteredType.comp != cond) {
        state.filteredType.comp = cond;
      }
    },
    addPageNo(state, pageNo) {
      state.pageNumber = pageNo;
    },
    searchTodos(state, search) {
      state.searchWord = search;
    },
    addShownNo(state, shown) {
      state.shownNo = shown;
    },
    /////////// auth mut ////////
    addUser(state, newUser){
      state.user = newUser;
    },
    clearUser(state) {
      state.user = null;
    },
    addErrMsg(state, msg){
      state.errMsg = msg;
    }
  },
  // ====================
  actions: {
    postTodos({ commit, getters}, todo) {
      var userId = getters.getUser.uid;
      axios
        .post(`${url}/${userId}/todos.json`, todo)
        .then(res => {
          const newTodo = todo;
          newTodo.id = res.data.name;
          commit("addTodo", newTodo);
        })
        .catch(function(error) {
          // console.log(error);
          
        });
    },
    getTodos({ commit, getters }) {
      var userId = getters.getUser.uid;
      axios.get(`${url}/${userId}/todos.json`).then(res => {
        commit("addTodos", res);
      });
    },
    deleteTodo({ commit, getters }, id) {
      var userId = getters.getUser.uid;
      axios
        .delete(`${url}/${userId}/todos/${id}.json`)
        .then(res => {
          commit("delTodo", id);
        });
    },
    updateTodo({ commit, getters }, todo) {
      var userId = getters.getUser.uid;
      axios
        .put(
          `${url}/${userId}/todos/${todo.id}.json`,
          todo
        )
        .then(res => {
          commit("upCond", todo);
        })
        .catch(error => {
          // console.log(error);
        });
    },
    updateCond({ commit, getters }, todo) {
      var userId = getters.getUser.uid;
      axios
        .put(
          `${url}/${userId}/todos/${todo.id}.json`,
          todo
        )
        .then(res => {
          commit("upCond", todo);
        })
        .catch(error => {
          // console.log(error);
        });
    },
    orderTodosAc({ commit }, cond) {
      commit("orderTd", cond);
    },
    orderCompAc({ commit }, cond) {
      commit("orderComp", cond);
    },
    addPageNoAc({ commit }, pageNo) {
      commit("addPageNo", pageNo);
    },
    searchTodosAc({ commit }, search) {
      commit("searchTodos", search);
    },
    addShownNoAc({ commit }, shown) {
      commit("addShownNo", shown);
    },
    ///////// Auth ////////////
    addUserAc({ commit,state }, userData) {
      //////// signUp /////
      state.errMsg = null;
      if (userData.type == "signup") {
        firebase
          .auth()
          .createUserWithEmailAndPassword(userData.email, userData.password)
          .then(data => {
            commit('addUser', {uid: data.user.uid, email: data.user.email})

          })
          .catch(err => {
            // console.log(err);
            commit('addErrMsg', "Email is already found in our database")
          });
      } else if (userData.type == "login") {
        firebase
          .auth()
          .signInWithEmailAndPassword(userData.email, userData.password)
          .then(data => {
            commit('addUser', {uid: data.user.uid, email: data.user.email})
          })
          .catch(err => {
            // this.error = err.message;
            commit('addErrMsg', "Email or Password is wrong ")
          });
      } else { commit("clearUser");}

    },
    logOutAc({ commit }){
      commit("clearUser");
    }
  }
});
