import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UsersList from "./pages/UsersList";
import UserDetail from "./pages/UserDetail";
import { PostsProvider } from "./context/PostsContext";

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
  return (
    <PostsProvider>
      <RouterProvider router={router} />
    </PostsProvider>
  );
}

export default App;
