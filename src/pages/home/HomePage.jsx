import { useQuizzes } from '../../hooks/useData';
import QuizCard from './QuizCard';
import styles from './HomePage.module.css';
import { useSearchQuiz } from '../../hooks/useData';
import { useState } from 'react';

const HomePage = () => {
  const { quizzes, error, loading, setQuizzes, setError } = useQuizzes();
  const [search, setSearch] = useState('');
  const [renderAmount, setRenderAmount] = useState(10);

  const handleSearch = async () => {
    const response = await useSearchQuiz(search);
    if (response === 'error') {
      setError(true);
    } else if (response === 'empty') {
      return;
    } else {
      setQuizzes(response);
    }
    setRenderAmount(10);
  };

  const handleLoadMore = () => {
    setRenderAmount((prevCount) => prevCount + 10);
  };

  if (error) return <h1 className={styles.message}>Server Error</h1>;
  if (loading) return <h1 className={styles.message}>Loading...</h1>;

  return (
    <>
      <h2 className={styles.title}>Pick a Quiz to Play with a Friend!</h2>
      <div className={styles.search_container}>
        <input
          className={styles.input}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className={styles.button} onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className={styles.container}>
        {quizzes.slice(0, renderAmount).map((quiz) => {
          return (
            <QuizCard
              key={quiz.id}
              quiz={{
                title: quiz.title,
                description: quiz.description,
                author: quiz.author.username,
                img: quiz.img,
                timesPlayed: quiz.timesPlayed,
                id: quiz.id
              }}
            />
          );
        })}
      </div>
      {quizzes.length > renderAmount && (
        <button className={styles.loadButton} onClick={handleLoadMore}>
          Load More
        </button>
      )}
    </>
  );
};

export default HomePage;
