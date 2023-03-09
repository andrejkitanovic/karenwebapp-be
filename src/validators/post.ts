import { body, param } from "express-validator";
import i18n from "helpers/i18n";
import Post from "models/post";

export const postPost = [
  body("category", i18n.__("VALIDATOR.CATEGORY.REQUIRED")).notEmpty(),
  body("content", i18n.__("VALIDATOR.CONTENT.REQUIRED")).notEmpty(),
  body("address", i18n.__("VALIDATOR.LOCATION.REQUIRED")).notEmpty(),
];

export const deletePost = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string, { req }) => {
      const { id } = req.auth;
      const postExists = await Post.exists({ _id: value, user: id });

      if (!postExists) {
        throw new Error(i18n.__("VALIDATOR.POST.NOT_FOUND"));
      }

      return true;
    }),
];

export const postUpvotePost = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string) => {
      const postExists = await Post.exists({ _id: value });

      if (!postExists) {
        throw new Error(i18n.__("VALIDATOR.POST.NOT_FOUND"));
      }

      return true;
    }),
];

export const postDownvotePost = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string) => {
      const postExists = await Post.exists({ _id: value });

      if (!postExists) {
        throw new Error(i18n.__("VALIDATOR.POST.NOT_FOUND"));
      }

      return true;
    }),
];

export const postPinPost = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string) => {
      const postExists = await Post.exists({ _id: value });

      if (!postExists) {
        throw new Error(i18n.__("VALIDATOR.POST.NOT_FOUND"));
      }

      return true;
    }),
];
