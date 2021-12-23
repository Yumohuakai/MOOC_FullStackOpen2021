import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('') 
  const [newAuthor, setNewAuthor] = useState('') 
  const [newUrl, setNewUrl] = useState('') 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService
      .getAll()
      .then(blogs => 
        setBlogs(blogs)
      )  
    }    
  }, [user])

  const showNotificationMessage = (message, type='success', timeInSeconds=5) => {
    setNotification({message, type})
    setTimeout(() => {
      setNotification(null)
    }, timeInSeconds*1000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({username, password,})
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) 
      // console.log('login in user token----------', user.token)
      blogService.setToken(user.token)
      setUser(user)
      showNotificationMessage('Login succeed')
      setUsername('')
      setPassword('')
    } catch (exception) {      
      showNotificationMessage('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    // console.log('now we will logout..............')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    showNotificationMessage('Logout succeed')
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log(`i will add blog--newTitle - ${newTitle}---newAuthor - ${newAuthor}----newUrl - ${newUrl}--`)
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        showNotificationMessage(`A new blog ${newTitle} by ${newAuthor} added`)
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')       
      })
      
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username  &nbsp;
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password  &nbsp;
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
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
  )


  return (
    <div>
      <Notification 
        notification={notification} 
      />
      {user === null ?
        loginForm() :
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in &nbsp;
            <button onClick={handleLogout}> logout </button>
          </p> 
          <div> {blogForm()} </div>

          <div>
            {blogs.map(blog => <Blog key={blog._id} blog={blog} />)}
          </div>
        </div>
      }
    </div>
  )
}

export default App