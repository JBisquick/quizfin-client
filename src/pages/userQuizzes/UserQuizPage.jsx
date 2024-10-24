import { useState } from 'react';
import { useUserQuizzes } from '../../hooks/useData';
import UserQuizCard from './UserQuizCard';
import CreateQuizForm from './CreateQuizForm';
import useAuth from '../../hooks/useAuth';
import styles from './UserQuizPage.module.css';

const UserQuizPage = () => {
  const { auth } = useAuth();
  const { userQuizzes, error, loading, setUserQuizzes } = useUserQuizzes(
    auth.id
  );
  const [popup, setPopup] = useState(false);

  const handleClick = () => {
    setPopup(!popup);
  };

  if (error) return <h1 className={styles.message}>Server Error</h1>;
  if (loading) return <h1 className={styles.message}>Loading...</h1>;

  return (
    <>
      <h2 className={styles.title}>Edit your Quizzes!</h2>
      <p className={styles.description}>
        In order to make your quiz public you must have at least 10 questions. When your quiz is being played, 10 random questions will be chosen from your quiz pool.
      </p>
      <div className={styles.container}>
        {userQuizzes.map((quiz, i) => {
          return (
            <UserQuizCard
              key={quiz.id}
              quizzes={userQuizzes}
              setQuizzes={setUserQuizzes}
              index={i}
              quiz={{
                title: quiz.title,
                createDate: quiz.createdAt,
                updateDate: quiz.updatedAt,
                published: quiz.published,
                id: quiz.id
              }}
            />
          );
        })}
      </div>
      <button className={styles.button} onClick={handleClick}>
        Create Quiz
      </button>
      {popup && (
        <div className={styles.popup_bg}>
          <CreateQuizForm
            cancel={handleClick}
            quizzes={userQuizzes}
            setQuizzes={setUserQuizzes}
          />
        </div>
      )}
    </>
  );
};

export default UserQuizPage;
