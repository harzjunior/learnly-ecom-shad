// frontend/src/store/index.js
import { createStore } from "vuex";

export default createStore({
  state: {
    username: "",
  },
  getters: {
    getUsername: (state) => state.username,
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
  },
  actions: {
    login({ commit }, user) {
      return fetch("http://localhost:5050/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.error) {
            commit("setUsername", data.username);
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
          }
          return data;
        });
    },
  },
  modules: {
    // Define your modules here if any
  },
});
