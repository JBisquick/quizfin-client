const QuestionCard = ({ question, correctAnswer, incorrectAnswers }) => {
  return (
    <div>
      <div>Question: {question}</div>
      <div>Correct: {correctAnswer}</div>
      {incorrectAnswers.map((answer, index) => (
        <div key={index}>Incorrect: {answer}</div>
      ))}
    </div>
  );
};

export default QuestionCard;
