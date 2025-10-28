import {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "shared/config/routeConfig.tsx";
import 'app/styles/index.css'

export const AppRouter = () => {
  return (
    <Suspense fallback={<div style={{fontSize: '20px'}}>Loading...</div>}>
      <Routes>
        {Object.values(routeConfig).map(({element, path}) => (
          <Route
            key={path}
            path={path}
            element={
              <div className='page-wrapper'>
                {element}
              </div>
            }
          />
        ))}
      </Routes>
    </Suspense>
  );
};