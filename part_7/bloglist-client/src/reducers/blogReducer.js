import blogService from '../services/blogs'

const bylikes = (b1, b2) => b2.likes - b1.likes

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT':
    return action.data
  case 'CREATE':
    return [ ...state, action.data]
  case 'LIKE': {
    const liked = action.data
    return state.map(b => b._id===liked._id ? liked : b).sort(bylikes)
  }
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


export const createBlog = newObject => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)
    dispatch({
      type: 'CREATE',
      data: newBlog,
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const toLike = { ...blog, likes: blog.likes + 1 }
    const updatedBlog = await blogService.update(toLike)
    // console.log('hi...---, newAnecdote from await-update blog----------', updatedBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog,
    })
  }
}


export default blogReducer