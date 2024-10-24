import { useEffect, useState } from 'react';
import useAxiosPrivate from './useAxiosPrivate';
import axios from '../api/axios';

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

  return { userQuizzes, error, loading, setUserQuizzes };
};

export const useQuizQuestions = (quizId) => {
  const axiosPrivate = useAxiosPrivate();
  const [userQuestions, setUserQuestions] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuizQuestions = async () => {
      try {
        const response = await axiosPrivate.get(`/quiz/${quizId}/question`);
        if (response.status >= 400) {
          throw new Error('Server Error');
        }
        const data = response.data;
        setUserQuestions(data);
        setLoading(false);
      } catch (err) {
        setError(error);
      }
    };
    getQuizQuestions();
  }, []);

  return { userQuestions, error, loading, setUserQuestions };
};

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const response = await axios.get('/quiz');
        if (response.status >= 400) {
          throw new Error('Server Error');
        }
        const data = response.data;
        setQuizzes(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    getQuizzes();
  }, []);

  return { quizzes, error, loading, setQuizzes, setError };
};

export const useSearchQuiz = async (search) => {
  try {
    if (search === '') return 'empty';
    const response = await axios.get(`/quiz/search/${search}`);
    if (response.status >= 400) {
      throw new Error('Server Error');
    }
    const data = response.data;
    return data;
  } catch (error) {
    return 'error';
  }
};

export const useQuiz = (id) => {
  const [quiz, setQuiz] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const response = await axios.get(`/quiz/${id}`);
        if (response.status >= 400) {
          throw new Error('Server Error');
        }
        const data = response.data;
        setQuiz(data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    getQuizzes();
  }, []);

  return { quiz, error, loading };
};
