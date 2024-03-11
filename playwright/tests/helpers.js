const createBlog = async (request, token, obj) => {
  await request.post('http://localhost:3001/api/blogs', {
    data: obj,
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

module.exports = {
  createBlog
}