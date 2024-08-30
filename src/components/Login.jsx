import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios';
import { useContext } from 'react';

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState([]);
  const [navigate, setNavigate] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/auth/login',
        JSON.stringify({ username, password }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (response.status >= 400) {
        throw new Error('server error'); 
      }
      const data = response.data;

      setUsername('');
      setPassword('');
      if (data.errors) {
        setMessage(data.errors);
      } else {
        setAuth({ username, password, accessToken: data.accessToken });
        setNavigate(true)
      }
    } catch (err) {
      setMessage([{ msg: 'No Server Response' }]);
    } 
  };

  if (navigate) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message.map((error) => (
        <p key={error.msg}>{error.msg}</p>
      ))}
    </>
  );
};

export default Login;
