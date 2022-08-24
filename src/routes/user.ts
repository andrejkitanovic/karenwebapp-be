import {
  deleteUser as deleteUserController,
  getSingleUser as getSingleUserController,
  getSingleUserFollowers as getSingleUserFollowersController,
  getSingleUserFollowing as getSingleUserFollowingController,
  getUsers as getUsersController,
  postFollowUser as postFollowUserController,
} from "controllers/user";
import { Router } from "express";
import defineRoutes from "helpers/defineRoutes";

const router = Router();
defineRoutes(router, [
  {
    method: "get",
    route: "/",
    roles: ["participant", "business", "admin"],
    permissions: ["read:users"],
    controller: getUsersController,
  },
  {
    method: "delete",
    route: "/:id",
    roles: ["admin"],
    permissions: ["delete:users"],
    controller: deleteUserController,
  },
  {
    method: "get",
    route: "/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["read:users"],
    controller: getSingleUserController,
  },
  {
    method: "post",
    route: "/follow/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["write:users"],
    controller: postFollowUserController,
  },
  {
    method: "get",
    route: "/followers/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["read:users"],
    controller: getSingleUserFollowersController,
  },
  {
    method: "get",
    route: "/following/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["read:users"],
    controller: getSingleUserFollowingController,
  },
]);

export default router;
