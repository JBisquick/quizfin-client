import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const EditQuizForm = ({ initTitle, initDescription, initPublished, id }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [title, setTitle] = useState(initTitle);
  const [description, setDescription] = useState(initDescription);
  const [published, setPublished] = useState(initPublished);
  const [message, setMessage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put(
        `/quiz/${id}`,
        JSON.stringify({ title, description, published })
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
      console.log(err);
      setMessage([{ msg: 'No Server Response' }]);
    }
  };

  const handleChange = () => {
    const newPublished = published ? false : true;
    setPublished(newPublished);
  };

  return (
    <>
      <h4>Edit Quiz Information</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title: </label>
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
          <label htmlFor="description">Description: </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength="400"
          />
        </div>
        <div>
          <label htmlFor="published">Published: </label>
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      {message.map((error) => (
        <p key={error.msg}>{error.msg}</p>
      ))}
    </>
  );
};

export default EditQuizForm;
