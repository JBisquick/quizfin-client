import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState } from 'react';
import EditQuestionForm from './EditQuestionForm';
import styles from './QuestionCard.module.css';

const QuestionCard = ({ question, quiz, setQuiz, index }) => {
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState('');
  const [popup, setPopup] = useState(false);

  const handleDelete = async (e) => {
    try {
      const response = await axiosPrivate.delete(
        `/quiz/${question.quizId}/question/${question.id}`
      );
      if (response.status >= 400) {
        throw new Error('Server Error');
      }

      const newQuiz = { ...quiz };
      newQuiz.questions.splice(index, 1);
      console.log(newQuiz);
      setQuiz(newQuiz);
    } catch (err) {
      console.log(err);
      setMessage('No Server Response');
    }
  };

  const handleEdit = () => {
    setPopup(!popup);
  };

  return (
    <>
      <div className={styles.container}>
        <h5 className={styles.question}>{question.text}</h5>
        <div className={styles.correct}>{question.correctAnswer}</div>
        {question.incorrectAnswers.map((answer, index) => (
          <div key={index} className={styles.incorrect}>
            {answer}
          </div>
        ))}
        <div className={styles.button_container}>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
        <div>{message}</div>
      </div>
      {popup && (
        <div className={styles.popup_bg}>
          <EditQuestionForm
            initQuestion={{
              question: question.text,
              img: question.img,
              correctAnswer: question.correctAnswer,
              incorrectAnswers: question.incorrectAnswers,
              id: question.id
            }}
            cancel={handleEdit}
            quiz={quiz}
            setQuiz={setQuiz}
            index={index}
          />
        </div>
      )}
    </>
  );
};

export default QuestionCard;
