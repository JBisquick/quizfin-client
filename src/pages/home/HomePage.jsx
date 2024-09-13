import { useQuizzes } from '../../hooks/useData';
import QuizCard from './QuizCard';
import styles from './HomePage.module.css';

const HomePage = () => {
  const { quizzes, error, loading } = useQuizzes();

  if (error) return <div>Server Error</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      {quizzes.map((quiz) => {
        return (
          <QuizCard
            key={quiz.id}
            quiz={{
              title: quiz.title,
              description: quiz.description,
              author: quiz.author.username,
              id: quiz.id
            }}
          />
        );
      })}
      <div className={styles.test}>
        <div className={styles.temp_image}></div>
      </div>
      <div className={styles.test}>
        <div className={styles.temp_image}></div>
      </div>
      <div className={styles.test}>
        <div className={styles.temp_image}></div>
      </div>
      <div className={styles.test}>
        <div className={styles.temp_image}></div>
      </div>
      <div className={styles.test}>
        <div className={styles.temp_image}></div>
      </div>
      <div className={styles.test}>
        <div className={styles.temp_image}></div>
      </div>
      <div className={styles.test}>
        <div className={styles.temp_image}></div>
      </div>
      <div className={styles.test}>
        <div className={styles.temp_image}></div>
      </div>
      <div className={styles.test}>
        <div className={styles.temp_image}></div>
      </div>
      <div className={styles.test}>
        <div className={styles.temp_image}></div>
      </div>
    </div>
  );
};

export default HomePage;
