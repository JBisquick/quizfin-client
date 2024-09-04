import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useLogout from '../hooks/useLogout';

const Navigation = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const signOut = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      {!auth?.username ? (
        <>
          <div>
            <Link to="/login">Login</Link>
          </div>
          <div>
            <Link to="/signup">Signup</Link>
          </div>
        </>
      ) : (
        <>
          <Link to="/my-quizzes">My Quizzes</Link>
          <div>Hello {auth.username}!</div>
          <button onClick={signOut}>Log Out</button>
        </>
      )}
    </div>
  );
};

export default Navigation;
