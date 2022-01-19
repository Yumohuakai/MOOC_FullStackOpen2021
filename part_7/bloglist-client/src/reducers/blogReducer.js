import blogService from '../services/blogs'


const blogReducer = (state = null, action) => {
  switch(action.type) {
  case 'INIT':
    return action.data
  case 'CREATE':
    return [ ...state, action.data]
  case 'DELETE':
    return state.filter(b => b._id!==action.data)
  case 'LIKE':
    return state.map(b => b._id===action.data._id ? action.data : b)
  case 'COMMENT':
    return state.map(b => b._id===action.data._id ? action.data : b)
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
    dispatch({
      type: 'DELETE',
      data: id,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    await blogService.update(blog)
    dispatch({
      type: 'LIKE',
      data: blog,
    })
  }
}

export const commentBlog = (blog) => {
  return async dispatch => {
    await blogService.createComment(blog)
    dispatch({
      type: 'COMMENT',
      data: blog,
    })
  }
}


export default blogReducer