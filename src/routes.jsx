import App from './pages/App';
import ErrorPage from './pages/ErrorPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import UserQuizPage from './pages/userQuizzes/UserQuizPage';
import EditQuizPage from './pages/editQuiz/EditQuizPage';
import HomePage from './pages/home/HomePage';
import GamePage from './pages/game/GamePage';

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
