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
      <div className='blog-title'>{ blog.title }</div>
      <button onClick={() => setVisible(!visible)}>
        {visible ? 'hide' : 'show'}
      </button> <br />
      {visible && (
        <div>
          <div>{ blog.url } <br /> </div>
          <div className='blog-likes'> likes: <span>{ likes }</span> <button onClick={addLike}>like</button> <br /> </div>
          <div className='blog-author'> Author: <span>{ blog.author }</span> <br /> </div>
          {((user && blog.user) && (blog.user.username === user.username)) && (
            <div>
              <button className='blog-delete-btn' onClick={() => deleteBlog(blog.id, blog)}>
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