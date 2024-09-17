import { useEffect, useState } from 'react';
import CountDown from './CountDown'
import styles from './Game.module.css';

const Game = ({ socket }) => {
  const [counter, setCounter] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [scores, setScores] = useState([0, 0]);
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [isCorrect, setIsCorrect] = useState('');
  const [result, setResult] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter > 0) {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  const updateQuestion = (data) => {
    setQuestion(data.question.question);
    setAnswers(data.question.answers);
    setCounter(10);
    setButtonDisable(false);
    setIsCorrect('');
  };

  const updateCorrect = () => {
    const newScore = scores;
    newScore[0]++;
    setScores(newScore);
    setIsCorrect('correct!');
  };

  const updateIncorrect = () => {
    setIsCorrect('incorrect!');
  };

  const updateOpponent = () => {
    const newScore = scores;
    newScore[1]++;
    setScores(newScore);
  };

  const updateGame = (isWinner) => {
    if (isWinner === 'winner') {
      setResult('YOU WON!!!!');
    } else if (isWinner === 'draw') {
      setResult('A DRAW?! BORING!!!');
    } else {
      setResult('Sadly... you lost :(');
    }
  };

  useEffect(() => {
    socket.on('send_question', updateQuestion);
    socket.on('correct', updateCorrect);
    socket.on('incorrect', updateIncorrect);
    socket.on('opponent_correct', updateOpponent);
    socket.on('end_game', updateGame);

    return () => {
      socket.off('send_question', updateQuestion);
      socket.off('correct', updateCorrect);
      socket.off('incorrect', updateIncorrect);
      socket.off('opponent_correct', updateOpponent);
      socket.off('end_game', updateGame);
    };
  }, [socket]);

  const submitAnswer = (answer) => {
    socket.emit('send_answer', answer);
    setButtonDisable(true);
  };

  if (result)
    return (
      <div className={styles.container}>
        <div className={styles.score_container}>
          <div>Your Score: {scores[0]} </div>
          <div>Opponent Score: {scores[1]}</div>
        </div>
        <h2>{result}</h2>
      </div>
    );

  return (
    <div className={styles.container}>
       <div className={styles.score_container}>
        <div>My Score: {scores[0]} </div>
        <div>Their Score: {scores[1]}</div>
      </div>
      <CountDown count={counter} />
      <h3 className={styles.question}>{question}</h3>
      <div className={styles.button_container}>
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
      </div>
      <h4>{isCorrect}</h4>
    </div>
  );
};

export default Game;
