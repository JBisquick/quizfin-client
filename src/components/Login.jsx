const Login = () => {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit="">
        <div>
          <label htmlFor="">Username: </label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Password </label>
          <input type="password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
