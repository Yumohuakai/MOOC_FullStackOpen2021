import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log('--------blogservice-------newToken', newToken)
  token = `bearer ${newToken}`
  console.log('--------blogservice-------token', token)
}

const getAll = async () => {
  console.log('--------blogservice-----getAll-----token', token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  // console.log('-----services-blogs.js-update-id-------------', newObject._id)
  // console.log('-----services-blogs.js-update object-------------', newObject)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${newObject._id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  // console.log('-----services-blogs.js-update-id-------------', id)
  const config = {
    headers: { Authorization: token },
  }
  return await axios.delete(`${baseUrl}/${id}`, config)
}

export default {
  getAll,
  setToken,
  create,
  update,
  remove
}