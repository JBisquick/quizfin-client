import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import styles from './auth.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
          email,
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
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          className={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autocomplete="off"
          required
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autocomplete="off"
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          id="passwordConf"
          placeholder="Password Confirmation"
          className={styles.input}
          value={passwordConf}
          onChange={(e) => setPasswordConf(e.target.value)}
          required
        />
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
