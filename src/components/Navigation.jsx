import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
};

export default Navigation;
