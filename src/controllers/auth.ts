import bcrypt from "bcryptjs";
import dayjs from "dayjs";
import { RequestHandler } from "express";
import i18n from "helpers/i18n";
import { adminPermissions } from "helpers/permissions";
import jwt from "jsonwebtoken";
import Post from "models/post";
import User, { IUser } from "models/user";
import {
  sendEmailResetPassword,
  sendEmailVerification,
  sendEmailWelcome,
} from "utils/mailer";

import { createVerificationCode } from "./verificationCode";

export const getMe: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.auth;

    const me = (await User.findById(id).select("+pinnedPosts")) as IUser;
    const recentSubmissions = await Post.count({
      user: id,
      createdAt: {
        $gt: dayjs().subtract(1, "week"),
      },
    });

    me.permissions = adminPermissions;
    me.recentSubmissions = recentSubmissions;

    res.json({
      data: me,
    });
  } catch (err) {
    next(err);
  }
};

export const postLogin: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    const token = jwt.sign({ id: user?._id }, process.env.DECODE_KEY || "", {
      // expiresIn: "1h",
    });

    res.json({
      token,
      message: i18n.__("CONTROLLER.AUTH.POST_LOGIN.LOGGED_IN"),
    });
  } catch (err) {
    next(err);
  }
};

export const postRegisterVerification: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { email } = req.body;
    const code = await createVerificationCode(email);

    await sendEmailVerification({ email, code });

    res.json({
      message: i18n.__("CONTROLLER.AUTH.POST_REGISTER.VERIFICATION_SENT"),
    });
  } catch (err) {
    next(err);
  }
};

export const postRegister: RequestHandler = async (req, res, next) => {
  try {
    const { role, name, email, password, companyAdministrator, companyType } =
      req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      password: hashedPassword,
      role,
      name,
      email,
      companyAdministrator,
      companyType,
    });
    const token = jwt.sign({ id: user._id }, process.env.DECODE_KEY || "", {
      // expiresIn: "1h",
    });

    await sendEmailWelcome({ email });

    res.json({
      token,
      message: i18n.__("CONTROLLER.AUTH.POST_REGISTER.REGISTERED"),
    });
  } catch (err) {
    next(err);
  }
};

export const postResetPasswordVerification: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { email } = req.body;
    const code = await createVerificationCode(email);

    await sendEmailResetPassword({ email, code });

    res.json({
      message: i18n.__("CONTROLLER.AUTH.POST_RESET_PASSWORD.VERIFICATION_SENT"),
    });
  } catch (err) {
    next(err);
  }
};

export const postResetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.findOneAndUpdate(
      { email: email },
      {
        password: hashedPassword,
      }
    );

    res.json({
      message: i18n.__("CONTROLLER.AUTH.POST_RESET_PASSWORD.PASSWORD_RESETED"),
    });
  } catch (err) {
    next(err);
  }
};

export const putMe: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.auth;
    const { name, email } = req.body;

    await User.findByIdAndUpdate(id, {
      name,
      email,
    });

    res.json({
      message: i18n.__("CONTROLLER.AUTH.PUT_ME.UPDATED"),
    });
  } catch (err) {
    next(err);
  }
};
