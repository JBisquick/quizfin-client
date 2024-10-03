import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CountDown from './CountDown';
import styles from './Game.module.css';
import incorrectSound from '../../sounds/incorrect.wav';
import correctSound from '../../sounds/correct.wav';

const Game = ({ socket, room }) => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(false);
  const [scores, setScores] = useState([0, 0]);
  const [img, setImg] = useState('');
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState(undefined);
  const [outcome, setOutcome] = useState(false);
  const [round, setRound] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter > 0) {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  const isCorrect = (buttonText) => {
    if (answer === undefined) {
      return styles.unknown;
    } else if (answer !== buttonText) {
      return styles.incorrect;
    } else {
      return styles.correct;
    }
  };

  const updateQuestion = (data, roomId) => {
    if (room !== roomId) return;
    setQuestion(data.question.question);
    setImg(data.question.img);
    setAnswers(data.question.answers);
    setCounter(10);
    setButtonDisable(false);
    setAnswer(undefined);
    setRound((newRound) => newRound + 1);
  };

  const updateCorrect = (answer) => {
    const newScore = scores;
    newScore[0]++;
    new Audio(correctSound).play();
    setScores(newScore);
    setAnswer(answer);
  };

  const updateIncorrect = (answer) => {
    new Audio(incorrectSound).play();
    setAnswer(answer);
  };

  const updateOpponent = () => {
    const newScore = scores;
    newScore[1]++;
    setScores(newScore);
  };

  const updateGame = (isWinner) => {
    if (isWinner === 'winner') {
      setOutcome('You Win!');
    } else if (isWinner === 'draw') {
      setOutcome('Draw.');
    } else {
      setOutcome('You Lost...');
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

  if (outcome)
    return (
      <div className={styles.container}>
        <div className={styles.score_container}>
          <div>Your Score: {scores[0]} </div>
          <div>Opponent Score: {scores[1]}</div>
        </div>
        <h2>{outcome}</h2>
        <button onClick={() => navigate(0)} className={styles.room_button}>
          Play Again
        </button>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.score_container}>
        <div>My Score: {scores[0]} </div>
        <div>Round: {round}</div>
        <div>Their Score: {scores[1]}</div>
      </div>
      <CountDown count={counter} />
      {img !== '' && (
        <img
          src={`https://ucarecdn.com/${img}/-/preview/640x640/-/quality/smart/`}
          width="320px"
          height="auto"
        />
      )}
      <h3 className={styles.question}>{question}</h3>
      <div className={styles.button_container}>
        {answers.map((answer, i) => (
          <button
            key={i}
            className={isCorrect(answer)}
            onClick={() => {
              submitAnswer(answer);
            }}
            disabled={buttonDisable}
          >
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Game;
