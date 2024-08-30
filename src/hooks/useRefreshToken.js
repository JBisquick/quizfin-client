import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post('http://localhost:3000/auth/refresh', {
      withCredentials: true
    });
    setAuth((prev) => {
      return { ...prev, accessToken: response.data.acessToken };
    });
    return response.data.acessToken;
  };

  return refresh;
};

export default useRefreshToken;
