import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AnimatedLayout from './ui/AnimatedLayout.jsx';
const Start = lazy(() => import('./components/Start'));
const Fuselage  = lazy(() => import('./components/Fuselage'));
const Airplane = lazy(() => import('./components/Airplane'));

const router = createBrowserRouter([
  {
    element: <AnimatedLayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<div className="bg-[url(/syspence.png)] h-screen w-screen bg-center bg-cover" /> }>
            <Start />
          </Suspense>
        ),
      },
      {
        path: '/fuselage',
        element: (
          <Suspense fallback={<div className="bg-[url(/syspence.png)] h-screen w-screen bg-center bg-cover" /> }>
            <Fuselage />
          </Suspense>
        ),
      },
      {
        path: '/airplane',
        element: (
          <Suspense fallback={<div className="bg-[url(/syspence.png)] h-screen w-screen bg-center bg-cover" /> }>
            <Airplane />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
