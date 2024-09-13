import { useUserQuizzes } from '../../hooks/useData';
import UserQuizCard from '../../components/UserQuizCard';
import CreateQuizForm from '../../components/CreateQuizForm';
import useAuth from '../../hooks/useAuth';
import styles from './UserQuizPage.module.css';

const UserQuizPage = () => {
  const { auth } = useAuth();
  const { userQuizzes, error, loading } = useUserQuizzes(auth.id);

  if (error) return <div>Server Error</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className={styles.title}>My Quizzes</h2>
      {userQuizzes.map((quiz) => {
        return (
          <UserQuizCard
            key={quiz.id}
            title={quiz.title}
            description={quiz.description}
            createDate={quiz.createdAt}
            updateDate={quiz.updatedAt}
            published={quiz.published}
            id={quiz.id}
          />
        );
      })}
      <CreateQuizForm />
    </div>
  );
};

export default UserQuizPage;
