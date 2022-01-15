import blogService from '../services/blogs'

// const bylikes = (b1, b2) => b2.likes - b1.likes

const blogReducer = (state = null, action) => {
  switch(action.type) {
  case 'INIT':
    return action.data
  case 'CREATE':
    return [ ...state, action.data]
  case 'DELETE':
    // return state.filter(b => b._id !== action.data.id)
    return action.data
  case 'LIKE':
    // return state.map(b => b._id===action.data._id ? action.data : b).sort(bylikes)
    return action.data
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}


export const createBlog = (newObject, user) => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)
    dispatch({
      type: 'CREATE',
      data: { ...newBlog, user: user }
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'DELETE',
      data: blogs
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.update(blog)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'LIKE',
      data: blogs,
    })
  }
}


export default blogReducer