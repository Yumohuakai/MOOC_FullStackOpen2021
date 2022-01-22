import React from 'react'
import  { useField } from '../customFormHook'
import {
  FormButton,
  FormButtonSecond,
  InputBlog,
  BlogFormDiv,
  BlogFormOuterDiv,
  FormHeadDiv,
  FormDiv
} from './StyledComponents'

const BlogForm = ({ newBlog, showForm, setShowForm }) => {
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

  // const [showForm, setShowForm] = useState(false)
  const hideForm = () => setShowForm(false)

  const blogform  = () => (
    <BlogFormOuterDiv>
      <FormHeadDiv>
        <h2>Create a new blog</h2>
      </FormHeadDiv>

      <FormDiv>
        <form onSubmit={addBlog}>
          <BlogFormDiv>
            <div>
              <InputBlog autoFocus required placeholder="title" { ...restOfNewTitle} />
            </div>
            <div>
              <InputBlog required placeholder="author" { ...restOfNewAuthor} />
            </div>
            <div>
              <InputBlog required placeholder="url" { ...restOfNewUrl} />
            </div>
            <div>
              <FormButton  id="create-button" type="submit"> Create </FormButton>
              <FormButtonSecond onClick={hideForm}>Cancel</FormButtonSecond>
            </div>
          </BlogFormDiv>
        </form>
      </FormDiv>
    </BlogFormOuterDiv>
  )

  return (
    <div>
      { showForm ? blogform() : null }
    </div>
  )
}

export default BlogForm