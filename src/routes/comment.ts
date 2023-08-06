import {
  deleteComment as deleteCommentController,
  getComments as getCommentsController,
  postComment as postCommentController,
  postCommentReply as postCommentReplyController,
} from "controllers/comment";
import { Router } from "express";
import defineRoutes from "helpers/defineRoutes";
import {
  deleteComment as deleteCommentValidator,
  postCommentReply as postCommentReplyValidator,
  postComment as postCommentValidator,
} from "validators/comment";

const router = Router();
defineRoutes(router, [
  {
    method: "get",
    route: "/",
    roles: ["business", "admin"],
    permissions: ["read:comments"],
    controller: getCommentsController,
  },
  {
    method: "post",
    route: "/",
    roles: ["business", "admin"],
    permissions: ["write:comments"],
    validator: postCommentValidator,
    controller: postCommentController,
  },
  {
    method: "delete",
    route: "/:id",
    roles: ["business", "admin"],
    permissions: ["delete:comments"],
    validator: deleteCommentValidator,
    controller: deleteCommentController,
  },
  {
    method: "post",
    route: "/:id/reply",
    roles: ["business", "admin"],
    permissions: ["write:comments"],
    validator: postCommentReplyValidator,
    controller: postCommentReplyController,
  },
]);

export default router;
