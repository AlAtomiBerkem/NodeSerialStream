import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CountdownProvider } from './context/CountdownContext.jsx';
import ExitTransition from "./ui/ExitTransition.jsx";
import EnterTransition from "./ui/EnterTransition.jsx";
const Greeting = lazy(() => import('./components/Greeting.jsx'));
const SecondScreen = lazy(() => import('./components/Second-screen.jsx'));
const ThreeScreen = lazy(() => import('./components/ThreeScreen.jsx'));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <Suspense fallback={<div className="bg-[url(/kosmosFon.png)] h-screen w-screen bg-center bg-cover" /> }>
        <ExitTransition>
          <Greeting />
          </ExitTransition>

        </Suspense>
    ),
  },
  {
    path: "/second",
    element: (
      <Suspense fallback={<div className="bg-[url(/kosmosFon.png)] h-screen w-screen bg-center bg-cover" /> }>
        <SecondScreen />
      </Suspense>
    ),
  },
  {
    path: "/three",
    element: (
      <EnterTransition>
        <Suspense fallback={<div className="bg-[url(/kosmosFon.png)] h-screen w-screen bg-center bg-cover" /> }>
          <ThreeScreen />
        </Suspense>
      </EnterTransition>
    ),
  },
]);

function App() {
  return (
    <CountdownProvider>
      <div className="fixed inset-0 -z-10 bg-[url(/kosmosFon.png)] bg-center bg-cover pointer-events-none" />
      <RouterProvider router={router} />
    </CountdownProvider>
  );
}

export default App; 