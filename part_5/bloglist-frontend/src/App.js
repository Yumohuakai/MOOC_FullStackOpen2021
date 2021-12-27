import React, { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      // console.log('--------all blogs', blogs)
    }
  }, [user])

  const showNotificationMessage = (message, type='success', timeInSeconds=5) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, timeInSeconds*1000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password, })
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

  const loginForm = () => (
    <form id='loginForm' onSubmit={handleLogin}>
      <h2>Login</h2>
      <div>
        username  &nbsp;
        <input
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password  &nbsp;
        <input
          type="password"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const removeBlog = (id) => {
    const blogObject = blogs.find(b => b._id === id)
    const ok = window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author} ?`)
    if (ok) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b._id !== id))
          showNotificationMessage(`Blog ${blogObject.title} by ${blogObject.author} is removed`)
        })
        .catch(error => {
          if (error.response) {
            showNotificationMessage(`${error.response.data.error}`, 'error')
          } else {
            showNotificationMessage(`${error}`, 'error')
          }

        })
    }

  }

  const updateBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(b => b._id !== id
          ? b
          : {
            ...b, likes: b.likes + 1
          }
        ))
        showNotificationMessage(`Blog ${returnedBlog.title} by ${returnedBlog.author} is updated`)
      })
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        // console.log('A new blog added', returnedBlog)
        setBlogs(blogs.concat({ ...returnedBlog, user: user }))
        showNotificationMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} is added`)
      })
  }

  const blogFormRef = useRef()
  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  return (
    <div>
      <Notification
        notification={notification}
      />
      {user === null ?
        loginForm() :
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} logged in &nbsp;
            <button onClick={handleLogout}> logout </button>
          </p>
          <div> {blogForm()} </div>

          <div>
            {[].concat(blogs)
              .sort((a, b) => a.likes > b.likes ? -1 : 1)
              .map(blog =>
                <Blog
                  key={blog._id}
                  blog={blog}
                  updateBlog={updateBlog}
                  removeBlog={removeBlog}
                  username={user.username}
                />
              )
            }
          </div>
        </div>
      }
    </div>
  )
}

export default App