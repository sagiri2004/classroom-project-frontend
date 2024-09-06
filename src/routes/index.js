import config from "~/config";

import { Home, Authentication, FlashCardPage, EditFlashcardPage } from "~/pages";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Authentication, layout: null },
  { path: config.routes.signup, component: Authentication, layout: null },
  { path: config.routes.flashCards, component: FlashCardPage },
  { path: config.routes.edit, component: EditFlashcardPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
