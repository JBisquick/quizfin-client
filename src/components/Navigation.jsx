import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navigation = () => {
  const { auth } = useAuth();

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
        <div>Hello {auth.username}!</div>
      )}
    </div>
  );
};

export default Navigation;
