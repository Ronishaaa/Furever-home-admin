import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import { Login } from "./pages";
import { Dashboard } from "./pages/Dashboard";
import Pets from "./pages/Pets";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },

        { path: "/pets", element: <Pets /> },
        // {
        //   path: "/pet/add-new-Pet",
        //   element: <AddNewPet />,
        // },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
