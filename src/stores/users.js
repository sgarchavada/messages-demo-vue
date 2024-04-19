import axiosInstance from '@/axiosInstance'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'users',
  state: () => ({
    users: [],
    active: 1, // to show messages of selected user
    messages: [],
    activeUser: {}
  }),
  actions: {
    async fetchAllUsers() {
      try {
        const result = await axiosInstance.get('/users') // for fetching all users for its messages
        const users = result.data
        this.users = users
        this.active = users[0].id
        this.activeUser = users[0]
        this.getMessagesFromUser(users[0].id)
      } catch (error) {
        console.log(error)
      }
    },
    async getMessagesFromUser(uid) {
      try {
        const result = await axiosInstance.get(`/posts?userId=${uid}`) // for fetching all users for its messages
        this.messages = result.data
      } catch (error) {
        console.log(error)
      }
    },
    selectUser(uid, index) {
      this.active = uid
      this.activeUser = this.users[index]
      this.getMessagesFromUser(uid)
    },
    async sendMessageToUser(message) {
      try {
        const result = await axiosInstance.post(`/posts`, message)
        this.messages.push(result.data)
        return true
      } catch (error) {
        console.log(error)
      }
    }
  }
})
