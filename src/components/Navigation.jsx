import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';
import styles from './Navigation.module.css';
import logo from '../imgs/logo.png';

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
        <img src={logo} className={styles.logo_container} height="48px"/>
        <div>Quizfin</div>
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
              <div className={styles.clickable}>Sign Up</div>
            </Link>
          </>
        ) : (
          <>
            <div className={styles.username}>{auth.username}</div>
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
