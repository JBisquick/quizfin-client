import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import styles from './UserQuizCard.module.css';

const UserQuizCard = ({ quiz }) => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const toLink = `/my-quizzes/${quiz.id}`;

  const createFormat = quiz.createDate.split('', 10).join('');
  const updateFormat = quiz.updateDate.split('', 10).join('');

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.delete(`/quiz/${quiz.id}`);
      if (response.status >= 400) {
        throw new Error('Server Error');
      }
      navigate(0);
    } catch (err) {
      setMessage('No Server Response');
    }
  };

  return (
    <Link to={toLink}>
      <div className={styles.container}>
        <h4 className={styles.title}>{quiz.title}</h4>
        <div className={styles.info}>Created: {createFormat}</div>
        <div className={styles.info}>Updated: {updateFormat}</div>
        <div className={styles.info}>
          Published: {quiz.published.toString()}
        </div>
        <button onClick={handleDelete} className={styles.button}>
          Delete Quiz
        </button>
        <div>{message}</div>
      </div>
    </Link>
  );
};

export default UserQuizCard;
