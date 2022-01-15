import React from 'react'

const BlogForm = ({ newBlog, resetValueOfNewTitle, restOfNewTitle, resetValueOfNewAuthor, restOfNewAuthor, resetValueOfNewUrl, restOfNewUrl }) => {

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