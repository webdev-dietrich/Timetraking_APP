import axios from 'axios'
import { defineStore } from 'pinia'

import { useTimetrackingStore } from '@/stores/timetracking'


export const useUserStore = defineStore('storeUsers', {
  state: () => {
    const timetrackingStore = useTimetrackingStore()
    return {
      user: {},
      users: [],
      userIsLoaded: false,
      timetrackingStore
    }
  },
  actions: {
    initUser(userData) {
      if(userData) {
        this.user = userData;
        this.userIsLoaded = true;
        this.timetrackingStore.getTimeEntriesByUser(userData.id);
      } else {
        this.user = {};
        this.users = [];
        this.userIsLoaded = false;
      }
    },
    async loginUser(username, password) {
      try {
        const response = await axios.post('http://127.0.0.1:3000/api/users/login', {
          username: username,
          userpw: password,
        });

        this.initUser(response.data.user);
      } catch (error) {
        console.error(error);
        throw new Error('Error during login');
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
