import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CreateQuestionForm = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [question, setQuestion] = useState('');
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
      console.log(err);
      setMessage([{ msg: 'No Server Response' }]);
    }
  };

  return (
    <div>
      <h4>Create Question</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Question: </label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="correctAnswer">Correct Answer:</label>
          <input
            type="text"
            id="correctAnswer"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="incorrect1">Incorrect Answer: </label>
          <input
            type="text"
            id="incorrect1"
            value={incorrect1}
            onChange={(e) => setIncorrect1(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="incorrect2">Incorrect Answer: </label>
          <input
            type="text"
            id="incorrect2"
            value={incorrect2}
            onChange={(e) => setIncorrect2(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="incorrectAnswer3">Incorrect Answer: </label>
          <input
            type="text"
            id="incorrect3"
            value={incorrect3}
            onChange={(e) => setIncorrect3(e.target.value)}
            required
          />
        </div>
        <button>Create Question</button>
      </form>
      {message.map((error) => (
        <p key={error.msg}>{error.msg}</p>
      ))}
    </div>
  );
};

export default CreateQuestionForm;
