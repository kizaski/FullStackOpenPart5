import Togglable from './Togglable'

// todo hide/show button instead of Togglable
// exc 5.7
// populate user field in blog 
// like button with put request (exc 5.9)
// sort blog posts by the number of likes with the array sort method
// button for deleting blog posts (Show the button only if blog was added by current logged in user)
// add Vite and ESlint config .eslintrc.cjs file
const Blog = ( { blog } ) =>
{
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
        { blog.title } <button>hide/show (not implemented)</button> <br />
      <Togglable buttonLabel='show' buttonHideLabel='hide'>
        { blog.url } <br />
        likes: { blog.likes } <br />
        Author: { blog.author } <br />
      </Togglable>
    </div>
  )
}

export default Blog