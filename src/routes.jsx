import App from './components/App';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import UserQuizPage from './components/UserQuizPage';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'my-quizzes', element: <UserQuizPage /> }
    ]
  }
];

export default routes;
