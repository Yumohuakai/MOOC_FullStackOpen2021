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
    <div>
      <form onSubmit={addBlog}>
        <h2>Create a new blog</h2>
        <div>
            title:  &nbsp;
          <input { ...restOfNewTitle} />
        </div>
        <div>
            author:  &nbsp;
          <input { ...restOfNewAuthor} />
        </div>
        <div>
            url:  &nbsp;
          <input { ...restOfNewUrl} />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>

  )
}

export default BlogForm