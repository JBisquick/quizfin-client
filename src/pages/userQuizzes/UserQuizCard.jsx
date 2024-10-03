import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserQuizCard.module.css';

const UserQuizCard = ({ quizzes, setQuizzes, quiz, index }) => {
  const axiosPrivate = useAxiosPrivate();
  const [message, setMessage] = useState('');
  const [deletePopup, setDeletePopup] = useState(false);
  const toLink = `/my-quizzes/${quiz.id}`;

  const createFormat = quiz.createDate.split('', 10).join('');
  const updateFormat = quiz.updateDate.split('', 10).join('');

  const handleDeletePopup = (e) => {
    e.preventDefault();
    setDeletePopup(!deletePopup);
  };

  const handleDelete = async (e) => {
    try {
      const response = await axiosPrivate.delete(`/quiz/${quiz.id}`);
      if (response.status >= 400) {
        throw new Error('Server Error');
      }
      setQuizzes(quizzes.filter((_, i) => i !== index));
      setDeletePopup(!deletePopup);
    } catch (err) {
      setMessage('No Server Response');
    }
  };

  return (
    <>
      <Link to={toLink}>
        <div className={styles.container}>
          <h4 className={styles.title}>{quiz.title}</h4>
          <div className={styles.info}>Created: {createFormat}</div>
          <div className={styles.info}>Updated: {updateFormat}</div>
          <div className={styles.info}>
            Public: {quiz.published.toString()}
          </div>
          <button onClick={handleDeletePopup} className={styles.button}>
            Delete Quiz
          </button>
        </div>
      </Link>
      {deletePopup && (
        <div className={styles.popup_bg}>
          <div className={styles.delete_container}>
            <h4>Are you sure you want to delete {quiz.title}</h4>
            <div className={styles.button_container}>
              <button className={styles.button} onClick={handleDelete}>
                Yes
              </button>
              <button className={styles.button} onClick={handleDeletePopup}>
                No
              </button>
            </div>
            <div>{message}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserQuizCard;
