import { param } from "express-validator";
import i18n from "helpers/i18n";
import User from "models/user";

export const deleteUser = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string) => {
      const userExists = await User.exists({ _id: value });

      if (!userExists) {
        throw new Error(i18n.__("VALIDATOR.POST.NOT_FOUND"));
      }

      return true;
    }),
];

export const getSingleUser = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string) => {
      const userExists = await User.exists({ _id: value });

      if (!userExists) {
        throw new Error(i18n.__("VALIDATOR.POST.NOT_FOUND"));
      }

      return true;
    }),
];

export const postFollowUser = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string) => {
      const userExists = await User.exists({ _id: value });

      if (!userExists) {
        throw new Error(i18n.__("VALIDATOR.POST.NOT_FOUND"));
      }

      return true;
    }),
];

export const getSingleUserFollowers = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string) => {
      const userExists = await User.exists({ _id: value });

      if (!userExists) {
        throw new Error(i18n.__("VALIDATOR.POST.NOT_FOUND"));
      }

      return true;
    }),
];

export const getSingleUserFollowing = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string) => {
      const userExists = await User.exists({ _id: value });

      if (!userExists) {
        throw new Error(i18n.__("VALIDATOR.POST.NOT_FOUND"));
      }

      return true;
    }),
];

export const getSingleUserGallery = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string) => {
      const userExists = await User.exists({ _id: value });

      if (!userExists) {
        throw new Error(i18n.__("VALIDATOR.POST.NOT_FOUND"));
      }

      return true;
    }),
];
