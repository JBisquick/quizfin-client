import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import Navigation from '../components/Navigation';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } finally {
        setLoading(false);
      }
    };

    if (!auth?.accessToken) verifyRefreshToken();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navigation></Navigation>
      <Outlet />
    </div>
  );
};

export default App;
