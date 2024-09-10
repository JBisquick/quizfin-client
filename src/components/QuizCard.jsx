import { Link } from "react-router-dom";

const QuizCard = ({ quiz }) => {
  const quizLink = `play-quiz/${quiz.id}`;

  return (
    <div>
      <h4><Link to={quizLink}>{quiz.title}</Link></h4>
      <p>{quiz.description}</p>
      <div>{quiz.author}</div>
      <div>{quiz.createdAt}</div>
      <div>{quiz.updatedAt}</div>
    </div>
  );
};

export default QuizCard;
