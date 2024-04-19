import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com' // Replace with your mock API URL
})

export const addUserMessage = (message, uid) => axiosInstance.post(`/post/${uid}`, message) // for adding your comment

export default axiosInstance
