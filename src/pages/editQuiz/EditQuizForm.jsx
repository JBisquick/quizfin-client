import { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import styles from './EditQuizForm.module.css';
import Uploader from '../../components/Uploader';

const EditQuizForm = ({ quiz, cancel, setQuiz }) => {
  const axiosPrivate = useAxiosPrivate();
  const [title, setTitle] = useState(quiz.title);
  const [img, setImg] = useState(quiz.img);
  const [description, setDescription] = useState(quiz.description);
  const [published, setPublished] = useState(quiz.published);
  const [message, setMessage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put(
        `/quiz/${quiz.id}`,
        JSON.stringify({ title, description, published, img })
      );
      if (response.status >= 400) {
        throw new Error('Server Error');
      }
      const data = response.data;
      if (data?.errors) {
        setMessage(data.errors);
      } else {
        const newQuiz = data;
        newQuiz.questions = quiz.questions;
        setQuiz(newQuiz);
        cancel();
      }
    } catch (err) {
      setMessage([{ msg: 'No Server Response' }]);
    }
  };

  const handleChange = () => {
    const newPublished = published ? false : true;
    setPublished(newPublished);
  };

  return (
    <div className={styles.container}>
      <h2>Edit Quiz</h2>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.uploader_container}>
          {img !== '' && (
            <>
              <img
                src={`https://ucarecdn.com/${img}/-/scale_crop/520x390/center/-/quality/smart/`}
                width="260px"
                height="195px"
              />
              <button
                className={styles.delete}
                onClick={() => setImg('')}
                type="button"
              >
                Delete Image
              </button>
            </>
          )}
          <div>Add Image</div>
          <Uploader setImg={setImg} />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
            maxLength="40"
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            className={styles.input}
            rows="5"
            cols="30"
            onChange={(e) => setDescription(e.target.value)}
            autoComplete="off"
            maxLength="150"
          />
        </div>
        <div className={styles.check_container}>
          <label htmlFor="published">Public</label>
          <input
            type="checkbox"
            id="published"
            className={styles.check}
            checked={published}
            onChange={handleChange}
          />
        </div>
        <div className={styles.button_container}>
          <button className={styles.button} onClick={cancel}>
            Cancel
          </button>
          <button type="submit" className={styles.button}>
            Update
          </button>
        </div>
      </form>
      {message.map((error) => (
        <p key={error.msg}>{error.msg}</p>
      ))}
    </div>
  );
};

export default EditQuizForm;
