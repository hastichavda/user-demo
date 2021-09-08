import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    selectedUser: null,
  },

  getters: {
    getUsers: (state) => state.users,
    getSelectedUser: (state) => state.selectedUser,
  },

  mutations: {
    add_user(state, data) {
      state.users.push(data)
      localStorage.setItem('users', JSON.stringify(state.users))
    },
    update_user(state, data) {
      let pos = state.users.findIndex((user) => user.id === data.id)
      state.users[pos] = data
    },
    set_users(state) {
      state.users = JSON.parse(localStorage.getItem('users'))
    },
    delete_user(state, id) {
      let index = state.users.findIndex((user) => user.id === id)
      state.users.splice(index, 1)
    },
    set_selected_user(state, data) {
      state.selectedUser = data
      localStorage.setItem('selectedUser', JSON.stringify(data))
    },
  },

  actions: {
    fetchUsers({ commit }) {
      commit('set_users')
    },
    addUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('https://jsonplaceholder.typicode.com/posts', data)
          .then((response) => {
            commit('add_user', response.data)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchUser({ commit }, data) {
      commit('set_selected_user', data)
    },
    updateUser({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .put(`https://jsonplaceholder.typicode.com/posts/${data.id}`, data)
          .then((response) => {
            commit('update_user', response.data)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    deleteUser({ commit }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
          .then((response) => {
            commit('delete_user', id)
            resolve(response)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
  },

  modules: {},
})
