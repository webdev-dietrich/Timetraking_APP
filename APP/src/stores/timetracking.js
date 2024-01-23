import axios from 'axios'
import { defineStore } from 'pinia'

export const useTimetrackingStore = defineStore('storeTimeEntries', {
  state: () => {
    return {
      times: [],
    }
  },
  actions: {
    async getAllTimeEntries() {
      try {
        const response = await axios.get('http://127.0.0.1:3000/api/timetracking');
        this.times = response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching time entries');
      }
    },

    async getTimeEntriesByUser(userId) {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/timetracking/${userId}`);
        this.times = response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching time entries for user');
      }
    },

    async setTimeEntry(userId, tracking_start) {
      try {
        const response = await axios.post(`http://127.0.0.1:3000/api/timetracking/${userId}`, {
          tracking_start,
        });
        this.times.push(response.data);
      } catch (error) {
        console.error(error);
        throw new Error('Error setting time entry');
      }
    },

    async updateTimeEntry(userId, entryId, tracking_stop) {
      try {
        const response = await axios.put(`http://127.0.0.1:3000/api/timetracking/${userId}/${entryId}`, {
          tracking_stop,
        });
        const index = this.times.findIndex(entry => entry.id === entryId);
        this.times[index] = response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Error updating time entry');
      }
    },

    async getTimeByUserLastEntry(userId) {
      try {
        const response = await axios.get(`http://127.0.0.1:3000/api/timetracking/${userId}/latest`);
        this.times.push(response.data);
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching latest time entry for user');
      }
    },
  },
});
