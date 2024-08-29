import config from "~/config";

import { Home, Authentication } from "~/pages";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Authentication, layout: null },
  { path: config.routes.signup, component: Authentication, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
