import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuizQuestions } from '../../hooks/useData';
import EditQuizForm from './EditQuizForm';
import QuestionCard from './QuestionCard';
import CreateQuestionForm from './CreateQuestionForm';
import styles from './EditQuizPage.module.css';

const EditQuizPage = () => {
  const { quizId } = useParams();
  const { userQuestions, error, loading, setUserQuestions } =
    useQuizQuestions(quizId);
  const [quizPopup, setQuizPopup] = useState(false);
  const [questionPopup, setQuestionPopup] = useState(false);

  const handleQuizClick = () => {
    setQuizPopup(!quizPopup);
  };

  const handleQuestionClick = () => {
    setQuestionPopup(!questionPopup);
  };

  if (error) return <h1 className={styles.message}>Server Error</h1>;
  if (loading) return <h1 className={styles.message}>Loading...</h1>;

  return (
    <>
      <div className={styles.title_container}>
        <h2>{userQuestions.title}</h2>
        <button className={styles.button} onClick={handleQuizClick}>
          Edit Quiz
        </button>
      </div>
      {quizPopup && (
        <div className={styles.popup_bg}>
          <EditQuizForm
            quiz={userQuestions}
            setQuiz={setUserQuestions}
            cancel={handleQuizClick}
          />
        </div>
      )}
      <div className={styles.question_container}>
        {userQuestions.questions.map((question, i) => {
          return (
            <QuestionCard
              key={question.id}
              question={{
                text: question.text,
                img: question.img,
                correctAnswer: question.correctAnswer,
                incorrectAnswers: question.incorrectAnswer,
                quizId: userQuestions.id,
                id: question.id
              }}
              quiz={userQuestions}
              setQuiz={setUserQuestions}
              index={i}
            />
          );
        })}
      </div>
      {questionPopup && (
        <div className={styles.popup_bg}>
          <CreateQuestionForm
            cancel={handleQuestionClick}
            quiz={userQuestions}
            setQuiz={setUserQuestions}
          />
        </div>
      )}
      <button className={styles.quest_button} onClick={handleQuestionClick}>
        Add Question
      </button>
    </>
  );
};

export default EditQuizPage;
