import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import {
  AddPets,
  AddRescueStories,
  AddSuccessStories,
  Applications,
  Dashboard,
  EditPets,
  EditRescueStories,
  EditSuccessStories,
  Login,
  Pets,
  RescueStories,
  SuccessStories,
} from "./pages";
import { socket } from "./socket";

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  console.log(isConnected);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Dashboard /> },

        { path: "/pets", element: <Pets /> },
        {
          path: "/pets/add-pet",
          element: <AddPets />,
        },
        { path: "/pets/edit-pet/:id", element: <EditPets /> },
        { path: "/rescue-stories", element: <RescueStories /> },
        {
          path: "/rescue-stories/add-rescue-story",
          element: <AddRescueStories />,
        },
        {
          path: "/rescue-stories/edit-rescue-story/:id",
          element: <EditRescueStories />,
        },
        {
          path: "/success-stories/edit-success-story/:id",
          element: <EditSuccessStories />,
        },
        { path: "/success-stories", element: <SuccessStories /> },
        {
          path: "/success-stories/add-success-story",
          element: <AddSuccessStories />,
        },
        { path: "/applications", element: <Applications /> },
      ],
    },
    { path: "/login", element: <Login /> },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
