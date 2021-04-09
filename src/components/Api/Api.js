import axios from 'axios'

axios.defaults.baseURL = process.env.API

export default axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})
