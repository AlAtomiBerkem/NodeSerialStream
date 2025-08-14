import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CountdownProvider } from './context/CountdownContext.jsx';
import ExitTransition from "./ui/ExitTransition.jsx";
import Greeting from './components/Greeting.jsx';
import SecondScreen from './components/Second-screen.jsx';
import ThreeScreen from './components/ThreeScreen.jsx';

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
  {
    path: "/three",
    element: <ThreeScreen />,
  },
]);

function App() {
  return (
    <CountdownProvider>
      <RouterProvider router={router} />
    </CountdownProvider>
  );
}

export default App; 