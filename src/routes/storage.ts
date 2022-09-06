import { getUploads as getUploadsController } from "controllers/storage";
import { Router } from "express";
import defineRoutes from "helpers/defineRoutes";

const router = Router();
defineRoutes(router, [
  {
    method: "get",
    route: "/",
    roles: ["admin"],
    controller: getUploadsController,
  },
]);

export default router;
