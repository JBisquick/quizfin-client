import { Link } from 'react-router-dom';
import styles from './QuizCard.module.css';
import QuizImage from '../../components/QuizImage';

const QuizCard = ({ quiz }) => {
  const quizLink = `play-quiz/${quiz.id}`;

  return (
    <Link to={quizLink}>
      <div className={styles.container}>
        {quiz.img != '' ? (
          <div className={styles.image} >
            <QuizImage img={quiz.img} />
          </div>
        ) : (
          <div className={styles.temp_image}></div>
        )}
        <div className={styles.text_container}>
          <h4 className={styles.quiz_title}>{quiz.title}</h4>
          <div className={styles.info}>
            <div>By: {quiz.author}</div>
            <div>Times Played: {quiz.timesPlayed}</div>
          </div>
          <p className={styles.quiz_description}>{quiz.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default QuizCard;
