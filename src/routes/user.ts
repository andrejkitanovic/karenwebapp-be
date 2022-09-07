import {
  deleteUser as deleteUserController,
  getSingleUser as getSingleUserController,
  getSingleUserFollowers as getSingleUserFollowersController,
  getSingleUserFollowing as getSingleUserFollowingController,
  getSingleUserGallery as getSingleUserGalleryController,
  getUsers as getUsersController,
  postFollowUser as postFollowUserController,
} from "controllers/user";
import { Router } from "express";
import defineRoutes from "helpers/defineRoutes";
import {
  deleteUser as deleteUserValidator,
  getSingleUserFollowers as getSingleUserFollowersValidator,
  getSingleUserFollowing as getSingleUserFollowingValidator,
  getSingleUserGallery as getSingleUserGalleryValidator,
  getSingleUser as getSingleUserValidator,
  postFollowUser as postFollowUserValidator,
} from "validators/user";

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
    validator: deleteUserValidator,
    controller: deleteUserController,
  },
  {
    method: "get",
    route: "/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["read:users"],
    validator: getSingleUserValidator,
    controller: getSingleUserController,
  },
  {
    method: "post",
    route: "/follow/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["write:users"],
    validator: postFollowUserValidator,
    controller: postFollowUserController,
  },
  {
    method: "get",
    route: "/followers/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["read:users"],
    validator: getSingleUserFollowersValidator,
    controller: getSingleUserFollowersController,
  },
  {
    method: "get",
    route: "/following/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["read:users"],
    validator: getSingleUserFollowingValidator,
    controller: getSingleUserFollowingController,
  },
  {
    method: "get",
    route: "/gallery/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["read:users"],
    validator: getSingleUserGalleryValidator,
    controller: getSingleUserGalleryController,
  },
]);

export default router;
