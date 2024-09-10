import { useEffect, useState } from 'react';

const Game = ({ socket }) => {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    socket.on('send_question', (data) => {
      setQuestion(data.question.question);
      setAnswers(data.question.answers);
    })
  }, [socket]);

  return (
    <div>
      <h4>{question}</h4>
      {answers.map((answer) => (
        <button key={answer}>{answer}</button>
      ))}
    </div>
  );
};

export default Game;
