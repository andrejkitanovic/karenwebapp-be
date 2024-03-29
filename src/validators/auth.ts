import bcrypt from "bcryptjs";
import { body } from "express-validator";
import i18n from "helpers/i18n";
import User, { Roles } from "models/user";
import VerificationCode from "models/verificationCode";

export const postLogin = [
  body("email", i18n.__("VALIDATOR.EMAIL.REQUIRED"))
    .notEmpty()
    .isEmail()
    .withMessage(i18n.__("VALIDATOR.EMAIL.NOT_VALID"))
    .custom(async (value: string) => {
      const user = await User.findOne({ email: value }).select("confirmed");

      if (!user) {
        throw new Error(i18n.__("VALIDATOR.INVALID_LOGIN_CREDENTIALS"));
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
        throw new Error(i18n.__("VALIDATOR.INVALID_LOGIN_CREDENTIALS"));
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
  body("code", i18n.__("VALIDATOR.VERIFICATION_CODE.REQUIRED"))
    .notEmpty()
    .custom(async (value: string, { req }) => {
      const email = req.body.email;

      const verificationCodeExists = await VerificationCode.exists({
        assigned: email,
        code: value,
      });

      if (!verificationCodeExists) {
        throw new Error(i18n.__("VALIDATOR.VERIFICATION_CODE.NOT_VALID"));
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

      if (!userExists) {
        throw new Error(i18n.__("VALIDATOR.USER.NOT_FOUND"));
      }

      return true;
    }),
];

export const postResetPassword = [
  body("email", i18n.__("VALIDATOR.EMAIL.REQUIRED"))
    .notEmpty()
    .isEmail()
    .withMessage(i18n.__("VALIDATOR.EMAIL.NOT_VALID"))
    .custom(async (value: string) => {
      const userExists = await User.exists({ email: value });

      if (!userExists) {
        throw new Error(i18n.__("VALIDATOR.USER.NOT_FOUND"));
      }

      return true;
    }),
  body("code", i18n.__("VALIDATOR.VERIFICATION_CODE.REQUIRED"))
    .notEmpty()
    .custom(async (value: string, { req }) => {
      const email = req.body.email;

      const verificationCodeExists = await VerificationCode.exists({
        assigned: email,
        code: value,
      });

      if (!verificationCodeExists) {
        throw new Error(i18n.__("VALIDATOR.VERIFICATION_CODE.NOT_VALID"));
      }

      return true;
    }),
  body("password", i18n.__("VALIDATOR.PASSWORD.REQUIRED")).notEmpty(),
];

export const putMe = [];
