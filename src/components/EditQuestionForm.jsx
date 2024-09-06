import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const EditQuestionForm = ({ initQuestion }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [question, setQuestion] = useState(initQuestion.question);
  const [correctAnswer, setCorrectAnswer] = useState(
    initQuestion.correctAnswer
  );
  const [incorrect1, setIncorrect1] = useState(
    initQuestion.incorrectAnswers[0]
  );
  const [incorrect2, setIncorrect2] = useState(
    initQuestion.incorrectAnswers[1]
  );
  const [incorrect3, setIncorrect3] = useState(
    initQuestion.incorrectAnswers[2]
  );
  const [message, setMessage] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.put(
        `/quiz/${quizId}/question/${initQuestion.id}`,
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
      setMessage([{ msg: 'No Server Response' }]);
    }
  };

  return (
    <div>
      <h4>Edit Question</h4>
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
        <button>Update</button>
      </form>
      {message.map((error) => (
        <p key={error.msg}>{error.msg}</p>
      ))}
    </div>
  );
};

export default EditQuestionForm;
