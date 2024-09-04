import { useState } from 'react';
import { useNavigate } from 'react-router';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const CreateQuizForm = () => {
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
    <>
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Title: </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="60"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Password </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="400"
          />
        </div>
        <button type="submit">Add Quiz</button>
      </form>
      {message.map((error) => (
        <p key={error.msg}>{error.msg}</p>
      ))}
    </>
  );
};

export default CreateQuizForm;
