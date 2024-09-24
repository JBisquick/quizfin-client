import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Uploader from '../../components/Uploader';
import styles from './QuestionForm.module.css';

const CreateQuestionForm = ({ cancel }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [question, setQuestion] = useState('');
  const [img, setImg] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [incorrect1, setIncorrect1] = useState('');
  const [incorrect2, setIncorrect2] = useState('');
  const [incorrect3, setIncorrect3] = useState('');
  const [message, setMessage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        `/quiz/${quizId}/question`,
        JSON.stringify({
          img,
          question,
          correctAnswer,
          incorrectAnswer1: incorrect1,
          incorrectAnswer2: incorrect2,
          incorrectAnswer3: incorrect3
        })
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
      <h2>Create Question</h2>
      <form onSubmit={handleSubmit} className={styles.form_container}>
        <div className={styles.uploader_container}>
          {img !== '' && (
            <img
              src={`https://ucarecdn.com/${img}/-/preview/640x640/-/quality/smart/`}
              width="320px"
              height="auto"
            />
          )}
          <div>Add Image</div>
          <Uploader setImg={setImg} />
          <button className={styles.delete} onClick={() => setImg('')} type="button">
            Delete Image
          </button>
        </div>
        <div className={styles.input_container}>
          <label htmlFor="question">Question</label>
          <textarea
            type="text"
            id="question"
            maxLength="100"
            rows="4"
            cols="25"
            autoComplete="off"
            className={styles.input}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="correctAnswer">Correct</label>
          <input
            type="text"
            id="correctAnswer"
            className={styles.input_correct}
            maxLength="25"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="incorrect1">Incorrect</label>
          <input
            type="text"
            id="incorrect1"
            className={styles.input_incorrect}
            maxLength="25"
            value={incorrect1}
            onChange={(e) => setIncorrect1(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="incorrect2">Incorrect</label>
          <input
            type="text"
            id="incorrect2"
            className={styles.input_incorrect}
            maxLength="25"
            value={incorrect2}
            onChange={(e) => setIncorrect2(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="incorrect3">Incorrect</label>
          <input
            type="text"
            id="incorrect3"
            className={styles.input_incorrect}
            maxLength="25"
            value={incorrect3}
            onChange={(e) => setIncorrect3(e.target.value)}
            autoComplete="off"
            required
          />
        </div>
        <div className={styles.button_container}>
          <button className={styles.button} onClick={cancel}>
            Cancel
          </button>
          <button type="submit" className={styles.button}>
            Add Question
          </button>
        </div>
      </form>
      {message.map((error) => (
        <p key={error.msg}>{error.msg}</p>
      ))}
    </div>
  );
};

export default CreateQuestionForm;
