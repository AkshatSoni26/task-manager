import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import ErrorBoundary from "./components/error/ErrorBoundary";
import Login from "./pages/Login";
import Register from "./pages/Register";
import routes from "./routes";

const router = createBrowserRouter(
  createRoutesFromElements([
    <Route element={<Home />} path={routes.home} errorElement={<ErrorBoundary />} />,
    <Route
      element={<Login />}
      path={routes.login}
      errorElement={<ErrorBoundary />}
    />,
    <Route
      element={<Register />}
      path={routes.register}
      errorElement={<ErrorBoundary />}
    />,
  ])
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
