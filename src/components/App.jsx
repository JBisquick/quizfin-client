import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Navigation from './Navigation';

const App = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refresh();
    };

    if (!auth?.accessToken) verifyRefreshToken();
  }, []);

  return (
    <div>
      <Navigation></Navigation>
      <Outlet />
    </div>
  );
};

export default App;
