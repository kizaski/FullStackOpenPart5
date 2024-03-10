const LoginForm = ( {
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
} ) =>
{
  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={ handleSubmit } id="login-form">
        <div>
          <label>username</label>
          <input
            id="username-input"
            value={ username }
            onChange={ handleUsernameChange }
          />
        </div>
        <div>
          <label>password</label>
          <input
            id="password-input"
            type="password"
            value={ password }
            onChange={ handlePasswordChange }
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm