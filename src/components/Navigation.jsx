import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import styles from './Navigation.module.css';

const Navigation = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo_container}>
        <div>Picture</div>
        <div>Quizz-App</div>
      </div>
      <div className={styles.menu_container}>
        <Link to="/">
          <div className={styles.clickable}>Home</div>
        </Link>
        {!auth?.username ? (
          <></>
        ) : (
          <Link to="/my-quizzes">
            <div className={styles.clickable}>My-Quizzes</div>
          </Link>
        )}
      </div>
      <div className={styles.user_container}>
        {!auth?.username ? (
          <>
            <Link to="/login">
              <div className={styles.clickable}>Login</div>
            </Link>
            <Link to="/signup">
              <div className={styles.clickable}>Signup</div>
            </Link>
          </>
        ) : (
          <>
            <div>Hello {auth.username}!</div>
            <button onClick={signOut} className={styles.log_out}>
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navigation;
