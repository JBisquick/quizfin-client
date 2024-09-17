import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import styles from './CreateQuizForm.module.css';

const CreateQuizForm = ({ cancel }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        '/quiz',
        JSON.stringify({ title, description })
      );
      if (response.status >= 400) {
        throw new Error('Server Error');
      }
      const data = response.data;

      if (data?.errors) {
        setMessage(data.errors);
      } else {
        navigate(0);
      }
    } catch (err) {
      setMessage([{ msg: 'No Server Response' }]);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.input_container}>
          <label htmlFor="title">Title</label>
          <input
            className={styles.input}
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="40"
            autocomplete="off"
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="description">Description</label>
          <textarea
            className={styles.input}
            id="description"
            rows="5"
            cols="30"
            autocomplete="off"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="150"
          />
        </div>
        <div className={styles.button_container}>
          <button className={styles.button} onClick={cancel}>
            Cancel
          </button>
          <button type="submit" className={styles.button}>
            Add Quiz
          </button>
        </div>
      </form>
      {message.map((error) => (
        <p key={error.msg}>{error.msg}</p>
      ))}
    </div>
  );
};

export default CreateQuizForm;
