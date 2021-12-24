import React, {useState} from 'react' 

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('') 
    const [newAuthor, setNewAuthor] = useState('') 
    const [newUrl, setNewUrl] = useState('') 

//   const handleChange = (event) => {
//     setNewNote(event.target.value)
//   }

//   const addNote = (event) => {
//     event.preventDefault()
//     createBlog({
//       content: newNote,
//       important: Math.random() > 0.5,
//     })
//     setNewNote('')
//   }

  const addBlog = (event) => {
    event.preventDefault()
    // console.log(`i will add blog--newTitle - ${newTitle}---newAuthor - ${newAuthor}----newUrl - ${newUrl}--`)
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')            
  }

  return (
    <div>
      {/* <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleChange}
        />
        <button type="submit">save</button>
      </form> */}
      <form onSubmit={addBlog}>
        <h2>Create a new blog</h2>
        <div>
            title:  &nbsp;
            <input
            type="text"
            value={newTitle}
            name="title"
            onChange={({ target }) => setNewTitle(target.value)}
            />
        </div>
        <div>
            author:  &nbsp;
            <input
            type="text"
            value={newAuthor}
            name="author"
            onChange={({ target }) => setNewAuthor(target.value)}
            />
        </div>
        <div>
            url:  &nbsp;
            <input
            type="text"
            value={newUrl}
            name="url"
            onChange={({ target }) => setNewUrl(target.value)}
            />
        </div>      
        <button type="submit">create</button>
      </form>
    </div>
    
  )
}

export default BlogForm