import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuiz } from '../../hooks/useData';
import Game from './Game';
import { io } from 'socket.io-client';
import styles from './Game.module.css';
const socket = io('https://quizfin-server.up.railway.app');

const GamePage = () => {
  const { quizId } = useParams();
  const { quiz, error, loading } = useQuiz(quizId);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');
  const [gameStart, setGameStart] = useState(false);

  const joinRoom = () => {
    if (room !== '') socket.emit('join_room', { room, quizId });
  };

  const startGame = () => {
    setGameStart(true);
  };

  const fullRoom = () => {
    setMessage('The current room is full');
  };

  const joinedRoom = (room) => {
    setMessage(`Joined ${room}`);
  };

  useEffect(() => {
    socket.on('joined', joinedRoom);
    socket.on('full', fullRoom);
    socket.on('start_game', startGame);

    return () => {
      socket.on('joined', joinedRoom);
      socket.off('full', fullRoom);
      socket.off('start_game', startGame);
    };
  }, [socket]);

  if (gameStart)
    return (
      <>
        <Game socket={socket} room={room} />
      </>
    );

  if (error) return <h1 className={styles.message}>Server Error</h1>;
  if (loading) return <h1 className={styles.message}>Loading...</h1>;

  return (
    <>
      <h2 className={styles.title}>{quiz.title}</h2>
      <p className={styles.description}>
        To play with a friend you must input the same code. Once two people have
        joined the same room, the match will start. There will be 10 rounds, and
        the person with the most correct answers will win.
      </p>
      <p className={styles.description}>{message}</p>
      <div className={styles.room_container}>
        <input
          className={styles.room_input}
          type="text"
          value={room}
          onChange={(e) => {
            setRoom(e.target.value);
          }}
          autoComplete="off"
        />
        <button onClick={joinRoom} className={styles.room_button}>
          Join Room
        </button>
      </div>
    </>
  );
};

export default GamePage;
