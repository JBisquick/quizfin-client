import { useParams } from 'react-router-dom';
import { useQuizQuestions } from '../hooks/useData';
import EditQuizForm from './EditQuizForm';
import QuestionCard from './QuestionCard';
import CreateQuestionForm from './CreateQuestionForm';

const EditQuizPage = () => {
  const { quizId } = useParams();
  const { userQuestions, error, loading } = useQuizQuestions(quizId);

  if (error) return <div>Server Error</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Quiz</h2>
      <EditQuizForm
        initTitle={userQuestions.title}
        initDescription={userQuestions.description}
        initPublished={userQuestions.published}
        id={userQuestions.id}
      />
      <h4>Edit Questions</h4>
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
      <CreateQuestionForm />
    </div>
  );
};

export default EditQuizPage;
