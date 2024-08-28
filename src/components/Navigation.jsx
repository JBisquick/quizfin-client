import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <div>
        <Link to="/login">Log In</Link>
      </div>
      <div>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Navigation;
