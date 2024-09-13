import { Link } from 'react-router-dom';
import styles from './QuizCard.module.css';

const QuizCard = ({ quiz }) => {
  const quizLink = `play-quiz/${quiz.id}`;

  return (
    <Link to={quizLink}>
      <div className={styles.container}>
        <div className={styles.temp_image}></div>
        <div className={styles.text_container}>
          <h4 className={styles.quiz_title}>{quiz.title}</h4>
          <div className={styles.quiz_author}>By: {quiz.author}</div>
          <p className={styles.quiz_description}>{quiz.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default QuizCard;
