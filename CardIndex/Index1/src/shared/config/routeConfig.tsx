import type { RouteProps } from 'react-router-dom';
import {FirstPage} from "pages/FirstPage";
import {MainPage} from "pages/MainPage";
import {SecondPage} from 'pages/SecondPage';
import {LastPage} from 'pages/LastPage';

export enum RouteConfig {
  MAIN = 'main',
  FIRST = 'first',
  SECOND = 'second',
  LAST = 'last',
}

export const routePath: Record<RouteConfig, string> = {
  [RouteConfig.MAIN]: "/",
  [RouteConfig.FIRST]: "/first",
  [RouteConfig.SECOND]: "/second",
  [RouteConfig.LAST]: "/last",
}

export const routeConfig: Record<RouteConfig, RouteProps> = {
  [RouteConfig.MAIN]: {
    path: routePath.main,
    element: <MainPage />
  },
  [RouteConfig.FIRST]: {
    path: routePath.first,
    element: <FirstPage />
  },
  [RouteConfig.SECOND]: {
    path: routePath.second,
    element: <SecondPage/>
  },
  [RouteConfig.LAST]: {
    path: routePath.last,
    element: <LastPage/>
  },
}