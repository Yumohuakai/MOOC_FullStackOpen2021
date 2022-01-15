import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  // console.log('--------userservice-------newToken', newToken)
  token = `bearer ${newToken}`
  // console.log('--------userservice-------token', token)
}

const getAll = async () => {
  // console.log('--------userservice-----getAll-----token', token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

export default {
  getAll,
  setToken,
}