import {Suspense} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {routeConfig} from "shared/config/routeConfig.tsx";
import 'app/styles/index.css'
import {LoadingScreen} from "src/widgets/LoadingScreen";
import {PageAnimation} from "shared/ui"
import { AnimatePresence } from 'framer-motion';

export const AppRouter = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<LoadingScreen/>}>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          {Object.values(routeConfig).map(({element, path}) => (
            <Route
              key={path}
              path={path}
              element={
                <PageAnimation>
                  {element}
                </PageAnimation>
              }
            />
          ))}
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};