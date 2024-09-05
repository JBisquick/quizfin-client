import { useParams } from 'react-router-dom';
import { useQuizQuestions } from '../hooks/useData';

const EditQuizPage = () => {
  const { quizId } = useParams();
  const { userQuestions, error, loading } = useQuizQuestions(quizId);
  console.log(userQuestions);

  return (
    <div>
      <h2>Edit Quiz</h2>
    </div>
  );
};

export default EditQuizPage;
