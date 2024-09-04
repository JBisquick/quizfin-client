import App from './components/App';
import ErrorPage from './components/ErrorPage';
import Login from './components/Login';
import UserQuizzes from './components/UserQuizzes';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'my-quizzes', element: <UserQuizzes /> }
    ]
  }
];

export default routes;
