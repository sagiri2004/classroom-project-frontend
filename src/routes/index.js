import config from "~/config";

import { Home, Authentication, FlashCardPage, EditFlashcardPage } from "~/pages";
import MiniDrawer from "~/layouts/components/Sidebar";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Authentication, layout: null },
  { path: config.routes.signup, component: Authentication, layout: null },
  { path: config.routes.flashCard, component: FlashCardPage },
  { path: config.routes.edit, component: EditFlashcardPage },
  { path: "test", component: MiniDrawer },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
