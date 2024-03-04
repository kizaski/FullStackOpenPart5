import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () =>
{
  const [ blogs, setBlogs ] = useState( [] )
  const [ message, setMessage ] = useState( null )
  const [ messageType, setMessageType ] = useState( '' )
  const [ username, setUsername ] = useState( '' )
  const [ password, setPassword ] = useState( '' )
  const [ user, setUser ] = useState( null )
  const [ title, setTitle ] = useState( '' )
  const [ author, setAuthor ] = useState( '' )
  const [ url, setUrl ] = useState( '' )

  const blogFormRef = useRef()

  useEffect( () =>
  {
    blogService.getAll().then( blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [] )

  useEffect( () =>
  {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [] )

  const handleLogout = async ( event ) =>
  {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleLogin = async ( event ) =>
  {
    event.preventDefault()

    try
    {
      const user = await loginService.login( {
        username, password
      } )

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser( user )
      console.log(user)
      setUsername( '' )
      setPassword( '' )
    } catch ( exception )
    {
      setMessageType( 'error' )
      setMessage( 'Wrong credentials' )
      setTimeout( () => { 
        setMessage( null ) 
        setMessageType( '' )
      }, 5000 )
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='login' buttonHideLabel='cancel'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const handleNewBlog = async ( event ) =>
  {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    try
    {
      const newblog = await blogService.create({
        title: title,
        author: author,
        url: url,
        user: user.id
      })

      setBlogs([...blogs,newblog])

      setMessageType( 'info' )
      setMessage( `A new blog ${newblog.title} by ${newblog.author} is added` )
      setTimeout( () => { 
        setMessage( null ) 
        setMessageType( '' )
      }, 5000 )

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch ( exception )
    {
      setMessageType( 'error' )
      setMessage( 'Error creating blog.' )
      setTimeout( () => { 
        setMessage( null ) 
        setMessageType( '' )
      }, 5000 )
    }
  }

  const newBlogForm = () => (
    <Togglable buttonLabel='new blog' buttonHideLabel='cancel' ref={blogFormRef}>
      <NewBlogForm 
        handleSubmit={handleNewBlog}
        handleTitleChange={( { target } ) => setTitle( target.value )}
        titleVal={title}
        handleAuthorChange={( { target } ) => setAuthor( target.value )}
        authorVal={author}
        handleUrlChange={( { target } ) => setUrl( target.value )}
        urlVal={url}
      />
    </Togglable>
  )

  return (
    <div>
      <Notification message={ message } type={ messageType }/>

      {user === null && loginForm()}
      {user !== null && 
        <div>
          <div>
            <div>
              {user.name} logged in.
            </div>
            <button onClick={handleLogout}>
              logout
            </button>
          </div>
          <div>
            {newBlogForm()}
          </div>
        </div>
      }

      <h2>blogs</h2>
      { blogs.map( blog =>
        <Blog key={ blog.id } blog={ blog } />
      ) }
    </div>
  )
}

export default App