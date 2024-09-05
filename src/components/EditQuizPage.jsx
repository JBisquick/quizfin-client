import { useParams } from 'react-router-dom';
import { useQuizQuestions } from '../hooks/useData';
import QuestionCard from './QuestionCard';

const EditQuizPage = () => {
  const { quizId } = useParams();
  const { userQuestions, error, loading } = useQuizQuestions(quizId);

  if (error) return <div>Server Error</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Quiz</h2>
      {userQuestions.questions.map((question) => {
        return (
          <QuestionCard
            key={question.id}
            question={question.text}
            correctAnswer={question.correctAnswer}
            incorrectAnswers={question.incorrectAnswer}
          />
        );
      })}
    </div>
  );
};

export default EditQuizPage;
