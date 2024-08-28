import Navigation from './Navigation';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Navigation></Navigation>
      <Outlet />
    </div>
  );
};

export default App;
