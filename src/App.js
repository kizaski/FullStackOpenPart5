import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
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

  useEffect( () =>
  {
    blogService.getAll().then( blogs =>
      setBlogs( blogs )
    )
  }, [] )

  // todo logout button with
  // window.localStorage.removeItem('loggedBlogappUser')
  useEffect( () =>
  {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [] )

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
    <form onSubmit={ handleLogin }>
        <div>
          username
          <input
            type="text"
            value={ username }
            name="Username"
            onChange={ ( { target } ) => setUsername( target.value ) }
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={ password }
            name="Password"
            onChange={ ( { target } ) => setPassword( target.value ) }
          />
        </div>
        <button type="submit">login</button>
      </form>
  )

  // Todo
  const blogForm = () => ( null )

  return (
    <div>
      <Notification message={ message } type={ messageType }/>

      {user === null && loginForm()}
      {user !== null && 
        <div>
          {user.name} logged in.
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