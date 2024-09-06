import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import EditQuestionForm from './EditQuestionForm';

const QuestionCard = ({
  question,
  correctAnswer,
  incorrectAnswers,
  quizId,
  id
}) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [display, setDisplay] = useState(false);

  const handleDelete = async (e) => {
    try {
      const response = await axiosPrivate.delete(
        `/quiz/${quizId}/question/${id}`
      );
      if (response.status >= 400) {
        throw new Error('Server Error');
      }
      navigate(0);
    } catch (err) {
      setMessage('No Server Response');
    }
  };

  const handleEdit = () => {
    const newDisplay = display ? false : true;
    setDisplay(newDisplay);
  };

  return (
    <>
      <div>
        <div>Question: {question}</div>
        <div>Correct: {correctAnswer}</div>
        {incorrectAnswers.map((answer, index) => (
          <div key={index}>Incorrect: {answer}</div>
        ))}
        <button onClick={handleEdit}>Edit Question</button>
        <button onClick={handleDelete}>Delete Question</button>
        <div>{message}</div>
      </div>
      {display ? (
        <EditQuestionForm
          initQuestion={{ question, correctAnswer, incorrectAnswers, id }}
        />
      ) : (
        <div></div>
      )}
    </>
  );
};

export default QuestionCard;
