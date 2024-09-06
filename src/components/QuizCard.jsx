const QuizCard = ({ quiz }) => {
  return (
    <div>
      <h4>{quiz.title}</h4>
      <p>{quiz.description}</p>
      <div>{quiz.author}</div>
      <div>{quiz.createdAt}</div>
      <div>{quiz.updatedAt}</div>
    </div>
  );
};

export default QuizCard;
