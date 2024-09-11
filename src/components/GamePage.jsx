import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Game from './game';
import { io } from 'socket.io-client';
const socket = io('http://localhost:3000');

const GamePage = () => {
  const { quizId } = useParams();
  const [room, setRoom] = useState('');
  const [gameStart, setGameStart] = useState(false);

  const joinRoom = () => {
    if (room !== '') socket.emit('join_room', { room, quizId });
  };

  useEffect(() => {
    socket.on('start_game', () => {
      setGameStart(true);
    });
  }, [socket]);

  if (gameStart)
    return (
      <>
        <Game socket={socket} />
      </>
    );

  return (
    <div>
      <div>Join the same room in order to play with friend!</div>
      <input
        type="text"
        value={room}
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default GamePage;
