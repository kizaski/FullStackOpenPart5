import { useState } from 'react'
import blogService from '../services/blogs'

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
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const updatedBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: likes + 1,
  }

  const addLike = () => {
    setLikes(likes + 1)
    blogService.update(blog.id, updatedBlog)
  }

  return (
    <div style={blogStyle}>
        { blog.title } 
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'hide' : 'show'}
        </button> <br />
        {visible && (
          <div>
            { blog.url } <br />
            likes: { likes } <button onClick={addLike}>like</button> <br />
            Author: { blog.author } <br />
          </div>
        )}
    </div>
  )
}

export default Blog