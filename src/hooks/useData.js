import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';

export const useUserQuizzes = (userId) => {
  const axiosPrivate = useAxiosPrivate();
  const [userQuizzes, setUserQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyQuizzes = async () => {
      try {
        const response = await axiosPrivate.get(`/quiz/my-quizzes/${userId}`);
        if (response.status >= 400) {
          throw new Error('Server Error');
        }
        const data = response.data;
        setUserQuizzes(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    getMyQuizzes();
  }, []);

  return { userQuizzes, error, loading };
};
