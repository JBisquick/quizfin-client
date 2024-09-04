import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Navigation from './Navigation';

const App = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      await refresh();
      setLoading(false);
    };

    if (!auth?.accessToken) verifyRefreshToken();
  }, []);

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <Navigation></Navigation>
      <Outlet />
    </div>
  );
};

export default App;
