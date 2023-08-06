import {
  getMe as getMeController,
  postLogin as postLoginController,
  postRegister as postRegisterController,
  postRegisterVerification as postRegisterVerificationController,
  postResetPassword as postResetPasswordController,
  postResetPasswordVerification as postResetPasswordVerificationController,
  putMe as putMeController,
} from "controllers/auth";
import { Router } from "express";
import defineRoutes from "helpers/defineRoutes";
import {
  postLogin as postLoginValidator,
  postRegister as postRegisterValidator,
  postRegisterVerification as postRegisterVerificationValidator,
  postResetPassword as postResetPasswordValidator,
  postResetPasswordVerification as postResetPasswordVerificationValidator,
  putMe as putMeValidator,
} from "validators/auth";

const router = Router();
defineRoutes(router, [
  {
    method: "get",
    route: "/me",
    roles: ["business", "admin"],
    controller: getMeController,
  },
  {
    method: "post",
    route: "/login",
    validator: postLoginValidator,
    controller: postLoginController,
  },
  {
    method: "post",
    route: "/register-verification",
    validator: postRegisterVerificationValidator,
    controller: postRegisterVerificationController,
  },
  {
    method: "post",
    route: "/register",
    validator: postRegisterValidator,
    controller: postRegisterController,
  },
  {
    method: "post",
    route: "/reset-password-verification",
    validator: postResetPasswordVerificationValidator,
    controller: postResetPasswordVerificationController,
  },
  {
    method: "post",
    route: "/reset-password",
    validator: postResetPasswordValidator,
    controller: postResetPasswordController,
  },
  {
    method: "put",
    route: "/me",
    roles: ["business", "admin"],
    validator: putMeValidator,
    controller: putMeController,
  },
]);

export default router;
