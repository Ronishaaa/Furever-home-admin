import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import {
  AddPets,
  Dashboard,
  EditPets,
  Login,
  Pets,
  RescueStories,
  SuccessStories,
} from "./pages";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },

        { path: "/pets", element: <Pets /> },
        { path: "/rescue-stories", element: <RescueStories /> },
        { path: "/success-stories", element: <SuccessStories /> },
        {
          path: "/pets/add-pet",
          element: <AddPets />,
        },
        { path: "/pets/edit-pet/:id", element: <EditPets /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
