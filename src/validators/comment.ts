import { body, param } from "express-validator";
import i18n from "helpers/i18n";
import Comment from "models/comment";

export const postComment = [
  body("post", i18n.__("VALIDATOR.POST.REQUIRED")).notEmpty(),
  body("content", i18n.__("VALIDATOR.CONTENT.REQUIRED")).notEmpty(),
];

export const deleteComment = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string, { req }) => {
      const { id } = req.auth;
      const commentExists = await Comment.exists({ _id: value, user: id });

      if (!commentExists) {
        throw new Error(i18n.__("VALIDATOR.COMMENT.NOT_FOUND"));
      }

      return true;
    }),
];

export const postCommentReply = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string) => {
      const commentExists = await Comment.exists({ _id: value });

      if (!commentExists) {
        throw new Error(i18n.__("VALIDATOR.COMMENT.NOT_FOUND"));
      }

      return true;
    }),
  body("content", i18n.__("VALIDATOR.CONTENT.REQUIRED")).notEmpty(),
];
