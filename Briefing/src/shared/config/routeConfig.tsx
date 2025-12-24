import type { RouteProps } from 'react-router-dom';
import { ExhibitionRoute } from 'pages/ExhibitionRoute'
import { Instructions } from 'pages/Instructions'
import { MainPage } from "pages/MainPage";

export enum RouteConfig {
  MAIN = 'main',
  INSTRUCTIONS = 'instructions',
  EXHIBITIONROUTE = 'exhibitionRoute',
}

export const routePath: Record<RouteConfig, string> = {
  [RouteConfig.MAIN]: "/",
  [RouteConfig.INSTRUCTIONS]: "/Instructions",
  [RouteConfig.EXHIBITIONROUTE]: "/ExhibitionRoute",
}

export const routeConfig: Record<RouteConfig, RouteProps> = {
  [RouteConfig.MAIN]: {
    path: routePath[RouteConfig.MAIN],
    element: <MainPage />
  },
  [RouteConfig.INSTRUCTIONS]: {
    path: routePath[RouteConfig.INSTRUCTIONS],
    element: <Instructions />
  },
  [RouteConfig.EXHIBITIONROUTE]: {
    path: routePath[RouteConfig.EXHIBITIONROUTE],
    element: <ExhibitionRoute/>
  },
}