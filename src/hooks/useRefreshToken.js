import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.post('/auth/refresh');
    setAuth((prev) => {
      return {
        ...prev,
        accessToken: response.data.acessToken,
        username: response.data.username
      };
    });
    return response.data.acessToken;
  };

  return refresh;
};

export default useRefreshToken;
