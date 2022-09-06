import { body, param } from "express-validator";
import i18n from "helpers/i18n";

export const postComment = [
  body("post", i18n.__("VALIDATOR.POST.REQUIRED")).notEmpty(),
  body("content", i18n.__("VALIDATOR.CONTENT.REQUIRED")).notEmpty(),
];

export const deleteComment = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED")).notEmpty(),
];

export const postCommentReply = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED")).notEmpty(),
  body("content", i18n.__("VALIDATOR.CONTENT.REQUIRED")).notEmpty(),
];
