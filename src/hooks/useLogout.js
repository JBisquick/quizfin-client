import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    const response = await axios.delete('/auth/logout');
  };

  return logout;
};

export default useLogout;
