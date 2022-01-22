import React, { useState } from 'react'
import BlogList from './BlogList'
// import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { addMessage } from '../reducers/notificationReducer'
import { Button, HomeBodyDiv } from './StyledComponents'

const Home = () => {
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => {
    // console.log('inside BlogList--------user----', user)
    return user
  })

  const [showForm, setShowForm] = useState(false)
  const showBlogForm = () => setShowForm(true)

  const addBlog = (blogObject) => {
    dispatch(createBlog(blogObject, user))
    dispatch(addMessage(`A new blog ${blogObject.title} by ${blogObject.author} is added`, 'success', 5))
  }

  const blogForm = () => (
    <BlogForm newBlog={addBlog} showForm={showForm} setShowForm={setShowForm}/>
  )


  // const addBlog = (blogObject) => {
  //   blogFormRef.current.toggleVisibility()
  //   dispatch(createBlog(blogObject, user))
  //   dispatch(addMessage(`A new blog ${blogObject.title} by ${blogObject.author} is added`, 'success', 5))
  // }

  // const blogFormRef = useRef()
  // const blogForm = () => (
  //   <Togglable buttonLabel='create new blog' ref={blogFormRef}>
  //     <BlogForm newBlog={addBlog} />
  //   </Togglable>
  // )

  return (
    <HomeBodyDiv>
      <Button onClick={showBlogForm}>create new blog</Button>
      { showForm ? blogForm() : null }
      {/* <div> {blogForm()} </div> */}
      <BlogList />
    </HomeBodyDiv>
  )
}

export default Home