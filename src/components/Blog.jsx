import { useState } from 'react'

const Blog = ( { blog, deleteBlog, updateBlog, user } ) =>
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
    id: blog.id
  }

  const addLike = () => {
    setLikes(likes + 1)
    updateBlog(updatedBlog)
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
          {((user && blog.user) && (blog.user.username === user.username)) && (
            <div>
              <button onClick={() => deleteBlog(blog.id, blog)}>
                  delete blog
              </button> <br />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog