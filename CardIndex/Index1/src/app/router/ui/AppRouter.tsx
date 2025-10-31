import {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "shared/config/routeConfig.tsx";
import 'app/styles/index.css'
import {LoadingScreen} from "src/widgets/LoadingScreen";
import {PageAnimation} from "shared/ui"

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingScreen/>}>
      <Routes>
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
    </Suspense>
  );
};