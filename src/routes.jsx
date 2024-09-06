import App from './components/App';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import UserQuizPage from './components/UserQuizPage';
import EditQuizPage from './components/EditQuizPage';
import HomePage from './components/HomePage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'login', element: <Login /> },
      { path: 'my-quizzes', element: <UserQuizPage /> },
      { path: 'my-quizzes/:quizId', element: <EditQuizPage /> }
    ]
  }
];

export default routes;
