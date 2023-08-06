import { getNotifications as getNotificationsController } from "controllers/notification";
import { Router } from "express";
import defineRoutes from "helpers/defineRoutes";

const router = Router();
defineRoutes(router, [
  {
    method: "get",
    route: "/",
    roles: ["business", "admin"],
    permissions: ["read:notifications"],
    controller: getNotificationsController,
  },
]);

export default router;
