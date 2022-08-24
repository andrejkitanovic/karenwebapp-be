import { Router } from "express";
import defineRoutes from "helpers/defineRoutes";

import {
  getNotifications as getNotificationsController,
  postReadNotification as postReadNotificationController,
} from "controllers/notification";

const router = Router();
defineRoutes(router, [
  {
    method: "get",
    route: "/",
    roles: ["participant", "business", "admin"],
    permissions: ["read:notifications"],
    controller: getNotificationsController,
  },
  {
    method: "post",
    route: "/read/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["read:notifications"],
    controller: postReadNotificationController,
  },
]);

export default router;
