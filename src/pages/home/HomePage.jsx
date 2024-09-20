import { useQuizzes } from '../../hooks/useData';
import QuizCard from './QuizCard';
import styles from './HomePage.module.css';

const HomePage = () => {
  const { quizzes, error, loading } = useQuizzes();

  if (error) return <h1 className={styles.message}>Server Error</h1>;
  if (loading) return <h1 className={styles.message}>Loading...</h1>;

  return (
    <>
      <h2 className={styles.title}>Play a Quiz!</h2>
      <div className={styles.container}>
        {quizzes.map((quiz) => {
          return (
            <QuizCard
              key={quiz.id}
              quiz={{
                title: quiz.title,
                description: quiz.description,
                author: quiz.author.username,
                img: quiz.img,
                id: quiz.id
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default HomePage;
