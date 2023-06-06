import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import SearchPage, {loader as searchLoader, action as searchAction} from "./pages/SearchPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'search', element: <SearchPage />, loader: searchLoader, action: searchAction }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
