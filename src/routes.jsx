import App from './components/App';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import Signup from './components/Signup';
import UserQuizPage from './components/UserQuizPage';
import EditQuizPage from './components/EditQuizPage';
import HomePage from './components/HomePage';
import GamePage from './components/GamePage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'my-quizzes', element: <UserQuizPage /> },
      { path: 'my-quizzes/:quizId', element: <EditQuizPage /> },
      { path: 'play-quiz/:quizId', element: <GamePage /> }
    ]
  }
];

export default routes;
