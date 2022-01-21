import React from 'react'
import  { useField } from '../customFormHook'

const BlogForm = ({ newBlog }) => {
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  const removeProp = 'resetValue'
  const { [removeProp]: resetValueOfNewTitle, ...restOfNewTitle } = newTitle
  const { [removeProp]: resetValueOfNewAuthor, ...restOfNewAuthor } = newAuthor
  const { [removeProp]: resetValueOfNewUrl, ...restOfNewUrl } = newUrl

  const addBlog = (event) => {
    event.preventDefault()
    newBlog({
      title: restOfNewTitle.value,
      author: restOfNewAuthor.value,
      url: restOfNewUrl.value,
    })
    resetValueOfNewTitle()
    resetValueOfNewAuthor()
    resetValueOfNewUrl()
  }

  return (
    <div className="create_blog">
      <div className="create_blog_header">
        <h2>Create a new blog</h2>
      </div>
      <div className='blog_form'>
        <form onSubmit={addBlog}>
          <div className='blog_form_body'>
            <div className="blog_form_input">
              <input autoFocus required placeholder="title" { ...restOfNewTitle} />
            </div>
            <div className="blog_form_input">
              <input required placeholder="author" { ...restOfNewAuthor} />
            </div>
            <div className="blog_form_input">
              <input required placeholder="url" { ...restOfNewUrl} />
            </div>
            <div className="blog_form_submit">
              <input  id="create-button" type="submit" value="Create"/>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogForm