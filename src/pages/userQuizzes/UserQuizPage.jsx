import { useUserQuizzes } from '../../hooks/useData';
import UserQuizCard from './UserQuizCard';
import CreateQuizForm from './CreateQuizForm';
import useAuth from '../../hooks/useAuth';
import styles from './UserQuizPage.module.css';
import { useState } from 'react';

const UserQuizPage = () => {
  const { auth } = useAuth();
  const { userQuizzes, error, loading } = useUserQuizzes(auth.id);

  if (error) return <h1 className={styles.message}>Server Error</h1>;
  if (loading) return <h1 className={styles.message}>Server Error</h1>;

  return (
    <>
      <h2 className={styles.title}>Edit your Quizzes!</h2>
      <div className={styles.container}>
        {userQuizzes.map((quiz) => {
          return (
            <UserQuizCard
              key={quiz.id}
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
      <CreateQuizForm />
    </>
  );
};

export default UserQuizPage;
