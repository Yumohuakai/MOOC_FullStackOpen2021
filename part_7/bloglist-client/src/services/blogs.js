import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  // console.log('--------blogservice-------newToken', newToken)
  token = `bearer ${newToken}`
  // console.log('--------blogservice-------token', token)
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

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject._id}`, newObject, getConfig())
  return response.data
}

const remove = async (id) => {
  return await axios.delete(`${baseUrl}/${id}`, getConfig())
}

const createComment = async (newObject) => {
  const response = await axios.post(`${baseUrl}/${newObject._id}/comments`, newObject, getConfig())
  return response.data
}

export default {
  getAll,
  setToken,
  create,
  update,
  remove,
  createComment
}