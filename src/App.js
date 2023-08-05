import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () =>
{
  const [ blogs, setBlogs ] = useState( [] )
  const [errorMessage, setErrorMessage] = useState(null)
  const [ username, setUsername ] = useState( '' )
  const [ password, setPassword ] = useState( '' )

  useEffect( () =>
  {
    blogService.getAll().then( blogs =>
      setBlogs( blogs )
    )
  }, [] )

  const handleLogin = ( event ) =>
  {
    event.preventDefault()
    console.log( 'logging in with', username, password )
  }

  return (
    <div>
      <Notification message={ errorMessage } />

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

      <h2>blogs</h2>
      { blogs.map( blog =>
        <Blog key={ blog.id } blog={ blog } />
      ) }
    </div>
  )
}

export default App