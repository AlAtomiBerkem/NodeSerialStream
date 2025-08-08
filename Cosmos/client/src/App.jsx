import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Greeting from "./components/Greeting";
import SecondScreen from "./components/Second-screen";
import ExitTransition from "./components/ExitTransition";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ExitTransition>
        <Greeting />
      </ExitTransition>
    ),
  },
  {
    path: "/second",
    element: <SecondScreen />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
