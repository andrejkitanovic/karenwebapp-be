import {
  deletePost as deletePostController,
  getPinnedPosts as getPinnedPostsController,
  getPostsCategoryCount as getPostsCategoryCountController,
  getPosts as getPostsController,
  postDownvotePost as postDownvotePostController,
  postPinPost as postPinPostController,
  postPost as postPostController,
  postUpvotePost as postUpvotePostController,
} from "controllers/post";
import { Router } from "express";
import defineRoutes from "helpers/defineRoutes";

const router = Router();
defineRoutes(router, [
  {
    method: "get",
    route: "/",
    roles: ["participant", "business", "admin"],
    permissions: ["read:posts"],
    controller: getPostsController,
  },
  {
    method: "post",
    route: "/",
    roles: ["participant", "business", "admin"],
    permissions: ["write:posts"],
    controller: postPostController,
  },
  {
    method: "delete",
    route: "/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["delete:posts"],
    controller: deletePostController,
  },
  {
    method: "get",
    route: "/category/count",
    roles: ["participant", "business", "admin"],
    permissions: ["read:posts"],
    controller: getPostsCategoryCountController,
  },
  {
    method: "post",
    route: "/upvote/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["write:posts"],
    controller: postUpvotePostController,
  },
  {
    method: "post",
    route: "/downvote/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["write:posts"],
    controller: postDownvotePostController,
  },
  {
    method: "get",
    route: "/pinned",
    roles: ["participant", "business", "admin"],
    permissions: ["read:posts"],
    controller: getPinnedPostsController,
  },
  {
    method: "post",
    route: "/pin/:id",
    roles: ["participant", "business", "admin"],
    permissions: ["read:posts"],
    controller: postPinPostController,
  },
]);

export default router;
