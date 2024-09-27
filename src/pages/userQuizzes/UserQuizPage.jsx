import { useState } from 'react';
import { useUserQuizzes } from '../../hooks/useData';
import UserQuizCard from './UserQuizCard';
import CreateQuizForm from './CreateQuizForm';
import useAuth from '../../hooks/useAuth';
import styles from './UserQuizPage.module.css';

const UserQuizPage = () => {
  const { auth } = useAuth();
  const { userQuizzes, error, loading, setUserQuizzes } = useUserQuizzes(auth.id);
  const [popup, setPopup] = useState(false);

  console.log(userQuizzes);

  const handleClick = () => {
    setPopup(!popup);
  };

  if (error) return <h1 className={styles.message}>Server Error</h1>;
  if (loading) return <h1 className={styles.message}>Server Error</h1>;

  return (
    <>
      <h2 className={styles.title}>Edit your Quizzes!</h2>
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
          <CreateQuizForm cancel={handleClick} quizzes={userQuizzes}
              setQuizzes={setUserQuizzes} />
        </div>
      )}
    </>
  );
};

export default UserQuizPage;
