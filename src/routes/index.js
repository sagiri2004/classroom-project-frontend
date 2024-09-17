import config from "~/config";

import {
  Home,
  Authentication,
  FlashCardPage,
  EditFlashcardPage,
  Settings,
  LibraryPage,
  ClassPage,
  FolderPage,
} from "~/pages";

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.login, component: Authentication, layout: null },
  { path: config.routes.signup, component: Authentication, layout: null },
  { path: config.routes.flashCards, component: FlashCardPage },
  { path: config.routes.edit, component: EditFlashcardPage },
  { path: config.routes.settings, component: Settings },
  { path: config.routes.library, component: LibraryPage },
  { path: config.routes.class, component: ClassPage },
  { path: config.routes.folders, component: FolderPage },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
