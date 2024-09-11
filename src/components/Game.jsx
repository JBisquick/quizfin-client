import { useEffect, useState } from 'react';

const Game = ({ socket }) => {
  const [counter, setCounter] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [scores, setScores] = useState([0, 0])
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter > 0) {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  useEffect(() => {
    socket.on('send_question', (data) => {
      setQuestion(data.question.question);
      setAnswers(data.question.answers);
      setCounter(10);
      setButtonDisable(false);
      setIsCorrect('');
    });

    socket.on('correct', () => {
      setScores([scores[0]++, scores[1]]);
      setIsCorrect('correct!');
    })

    socket.on('incorrect', () => {
      setIsCorrect('incorrect!');
    })

    socket.on('opponent_correct', () => {
      setScores([scores[0], scores[1]++]);
    })
  }, [socket]);

  const submitAnswer = (answer) => {
    socket.emit('send_answer', answer)
    setButtonDisable(true);
  };

  return (
    <div>
      <div>Score: {scores[0]}</div>
      <div>Opponent Score: {scores[1]}</div>
      <div>{counter}</div>
      <h4>{question}</h4>
      {answers.map((answer) => (
        <button
          key={answer}
          onClick={() => {
            submitAnswer(answer);
          }}
          disabled={buttonDisable}
        >
          {answer}
        </button>
      ))}
      <div>{isCorrect}</div>
    </div>
  );
};

export default Game;
