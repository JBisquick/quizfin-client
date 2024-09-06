import { useQuizzes } from '../hooks/useData';
import QuizCard from './QuizCard';

const HomePage = () => {
  const { quizzes, error, loading } = useQuizzes();

  if (error) return <div>Server Error</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      {quizzes.map((quiz) => {
        return (
          <QuizCard
            key={quiz.id}
            quiz={{
              title: quiz.title,
              description: quiz.description,
              author: quiz.author.username,
              createdAt: quiz.createdAt,
              updatedAt: quiz.updatedAt
            }}
          />
        );
      })}
    </>
  );
};

export default HomePage;
