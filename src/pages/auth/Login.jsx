import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import styles from './auth.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/auth/login',
        JSON.stringify({ username, password })
      );
      if (response.status >= 400) {
        throw new Error('Server Error');
      }
      const data = response.data;

      setPassword('');
      if (data?.errors) {
        setMessage(data.errors);
      } else {
        setAuth({
          username: data.username,
          accessToken: data.accessToken,
          id: data.id
        });
        navigate('/');
      }
    } catch (err) {
      setMessage([{ msg: 'No Server Response' }]);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <input
          className={styles.input}
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autocomplete="off"
          required
        />
        <input
          className={styles.input}
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      {message.map((error) => (
        <p key={error.msg} className={styles.error}>
          {error.msg}
        </p>
      ))}
    </div>
  );
};

export default Login;
