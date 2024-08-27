import App from "./App";
import ErrorPage from "./errorPage";

const routes = [
  {
    path: "/",
    element: <App/>,
    errorElment: <ErrorPage/>
  }
];

export default routes;
