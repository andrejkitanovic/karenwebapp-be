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
import {
  deletePost as deletePostValidator,
  postDownvotePost as postDownvotePostValidator,
  postPinPost as postPinPostValidator,
  postPost as postPostValidator,
  postUpvotePost as postUpvotePostValidator,
} from "validators/post";

const router = Router();
defineRoutes(router, [
  {
    method: "get",
    route: "/",
    roles: ["business", "admin"],
    permissions: ["read:posts"],
    controller: getPostsController,
  },
  {
    method: "post",
    route: "/",
    roles: ["business", "admin"],
    permissions: ["write:posts"],
    validator: postPostValidator,
    controller: postPostController,
  },
  {
    method: "delete",
    route: "/:id",
    roles: ["business", "admin"],
    permissions: ["delete:posts"],
    validator: deletePostValidator,
    controller: deletePostController,
  },
  {
    method: "get",
    route: "/category/count",
    roles: ["business", "admin"],
    permissions: ["read:posts"],
    controller: getPostsCategoryCountController,
  },
  {
    method: "post",
    route: "/upvote/:id",
    roles: ["business", "admin"],
    permissions: ["write:posts"],
    validator: postUpvotePostValidator,
    controller: postUpvotePostController,
  },
  {
    method: "post",
    route: "/downvote/:id",
    roles: ["business", "admin"],
    permissions: ["write:posts"],
    validator: postDownvotePostValidator,
    controller: postDownvotePostController,
  },
  {
    method: "get",
    route: "/pinned",
    roles: ["business", "admin"],
    permissions: ["read:posts"],
    controller: getPinnedPostsController,
  },
  {
    method: "post",
    route: "/pin/:id",
    roles: ["business", "admin"],
    permissions: ["read:posts"],
    validator: postPinPostValidator,
    controller: postPinPostController,
  },
]);

export default router;
