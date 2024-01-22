import axios from 'axios'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('storeUsers', {
  state: () => {
    return {
      user: {},
      users: [],
      userIsLoaded: false
    }
  },
  actions: {
    async loginUser(username, password) {
      try {
        const response = await axios.post('http://127.0.0.1:3000/api/users/login', {
          username: username,
          userpw: password
        })

        this.user = response.data.user
        this.userIsLoaded = true
      } catch (error) {
        console.error(error)
        throw new Error('Error during login')
      }
    },
    async registerUser(username, firstname, lastname, password) {
      try {
        const response = await axios.post('http://127.0.0.1:3000/api/users/register', {
          username: username,
          userpw: password,
          firstname: firstname,
          lastname: lastname
        })

        setTimeout(() => {
          this.loginUser(username, password)
        }, 2000);
      } catch (error) {
        console.error(error)
        throw new Error('Error during login')
      }
    },
    logoutUser() {
      this.user = {}
      this.userIsLoaded = false
    }
  }
})
