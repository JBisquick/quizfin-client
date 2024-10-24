import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import styles from './auth.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [message, setMessage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        '/auth/signup',
        JSON.stringify({
          username,
          password,
          passwordConfirmation: passwordConf
        })
      );
      if (response.status >= 400) {
        throw new Error('Server Error');
      }
      const data = response.data;

      setPassword('');
      setPasswordConf('');
      if (data?.errors) {
        setMessage(data.errors);
      } else {
        navigate('/login');
      }
    } catch (err) {
      setMessage([{ msg: 'No Server Response' }]);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      <p className={styles.description}>
        Creating an account is necessary only if you intend to create quizzes.
        You are able to play quiz games without creating an account.
      </p>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.input_container}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="passwordConf">Password Confirmation</label>
          <input
            type="password"
            id="passwordConf"
            className={styles.input}
            value={passwordConf}
            onChange={(e) => setPasswordConf(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Sign Up
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

export default Signup;
