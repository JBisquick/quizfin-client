import { Link } from 'react-router-dom';
import styles from './QuizCard.module.css';

const QuizCard = ({ quiz }) => {
  const quizLink = `play-quiz/${quiz.id}`;

  return (
    <Link to={quizLink}>
      <div className={styles.container}>
        <img
          src={`https://ucarecdn.com/${quiz.img}/-/scale_crop/520x390/center/-/quality/smart/`}
          width="260px"
          height="195px"
        />
        <div className={styles.text_container}>
          <h4 className={styles.quiz_title}>{quiz.title}</h4>
          <div className={styles.info}>
            <div>By: {quiz.author}</div>
            <div>Games Played: {quiz.timesPlayed}</div>
          </div>
          <p className={styles.quiz_description}>{quiz.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default QuizCard;
