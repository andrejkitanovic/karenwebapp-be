import bcrypt from "bcryptjs";
import { body } from "express-validator";
import i18n from "helpers/i18n";
import User, { Roles } from "models/user";

export const postLogin = [
  body("email", i18n.__("VALIDATOR.EMAIL.REQUIRED"))
    .notEmpty()
    .isEmail()
    .withMessage(i18n.__("VALIDATOR.EMAIL.NOT_VALID"))
    .custom(async (value: string) => {
      const user = await User.findOne({ email: value }).select("confirmed");

      if (!user) {
        throw new Error(i18n.__("VALIDATOR.USER.NOT_FOUND"));
      }

      return true;
    }),

  body("password", i18n.__("VALIDATOR.PASSWORD.REQUIRED"))
    .notEmpty()
    .custom(async (value: string, { req }) => {
      const user = await User.findOne({ email: req.body.email }).select(
        "password"
      );
      const isValidPassword = await bcrypt.compare(value, user?.password || "");

      if (!isValidPassword) {
        throw new Error(i18n.__("VALIDATOR.USER.INVALID_PASSWORD"));
      }

      return true;
    }),
];

export const postRegisterVerification = [
  body("email", i18n.__("VALIDATOR.EMAIL.REQUIRED"))
    .notEmpty()
    .isEmail()
    .withMessage(i18n.__("VALIDATOR.EMAIL.NOT_VALID"))
    .custom(async (value: string) => {
      const userExists = await User.exists({ email: value });

      if (userExists) {
        throw new Error(i18n.__("VALIDATOR.USER.EXISTS"));
      }

      return true;
    }),
];

export const postRegister = [
  body("role", i18n.__("VALIDATOR.ROLE.REQUIRED"))
    .notEmpty()
    .isIn(Object.values(Roles))
    .withMessage(i18n.__("VALIDATOR.ROLE.ONE_OF")),
  body("name", i18n.__("VALIDATOR.NAME.REQUIRED")).notEmpty(),
  body("email", i18n.__("VALIDATOR.EMAIL.REQUIRED"))
    .notEmpty()
    .isEmail()
    .withMessage(i18n.__("VALIDATOR.EMAIL.NOT_VALID"))
    .custom(async (value: string) => {
      const userExists = await User.exists({ email: value });

      if (userExists) {
        throw new Error(i18n.__("VALIDATOR.USER.EXISTS"));
      }

      return true;
    }),
  body("password", i18n.__("VALIDATOR.PASSWORD.REQUIRED")).notEmpty(),
];

export const postResetPasswordVerification = [
  body("email", i18n.__("VALIDATOR.EMAIL.REQUIRED"))
    .notEmpty()
    .isEmail()
    .withMessage(i18n.__("VALIDATOR.EMAIL.NOT_VALID"))
    .custom(async (value: string) => {
      const userExists = await User.exists({ email: value });

      if (userExists) {
        throw new Error(i18n.__("VALIDATOR.USER.EXISTS"));
      }

      return true;
    }),
];

export const postResetPassword = [
  body("password", i18n.__("VALIDATOR.PASSWORD.REQUIRED")).notEmpty(),
];

export const putMe = [];
