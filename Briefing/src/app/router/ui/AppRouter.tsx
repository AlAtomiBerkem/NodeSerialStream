import {Suspense} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {routeConfig} from "shared/config/routeConfig.tsx";
import 'app/styles/index.css'
import {BackgroundScreen} from 'widgets/BackgroundScreen'

export const AppRouter = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<BackgroundScreen/>}>
        <Routes location={location} key={location.pathname}>
          {Object.values(routeConfig).map(({element, path}) => (
            <Route
              key={path}
              path={path}
              element={element}
            />
          ))}
        </Routes>
    </Suspense>
  );
};