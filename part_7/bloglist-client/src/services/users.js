import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  // console.log('--------userservice-------newToken', newToken)
  token = `bearer ${newToken}`
  // console.log('--------userservice-------token', token)
}

const getConfig = () => {
  if (token) {
    return {
      headers: { Authorization: token }
    }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, getConfig())
  return response.data
}

export default {
  getAll,
  setToken,
}