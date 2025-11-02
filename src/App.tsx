import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersList from "./pages/UsersList";
import UserDetail from "./pages/UserDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UsersList />,
  },
  {
    path: "/user/:id",
    element: <UserDetail />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
