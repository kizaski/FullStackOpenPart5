const newBlogForm = ( {
  handleSubmit,
  handleTitleChange,
  titleVal,
  handleAuthorChange,
  authorVal,
  handleUrlChange,
  urlVal } ) =>
{
  return (
    <div>
      <h2>
                Create new blog
      </h2>
      <form onSubmit={ handleSubmit }>
        <div>
                    title
          <input
            type="text"
            value={ titleVal }
            name="Title"
            onChange={ handleTitleChange }
          />
        </div>
        <div>
                    author
          <input
            type="text"
            value={ authorVal }
            name="Author"
            onChange={ handleAuthorChange }
          />
        </div>
        <div>
                    url
          <input
            type="text"
            value={ urlVal }
            name="Url"
            onChange={ handleUrlChange }
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default newBlogForm