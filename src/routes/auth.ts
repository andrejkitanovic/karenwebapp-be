import {
  getMe as getMeController,
  postLogin as postLoginController,
  postRegister as postRegisterController,
  postRegisterVerification as postRegisterVerificationController,
  putMe as putMeController,
} from "controllers/auth";
import { Router } from "express";
import defineRoutes from "helpers/defineRoutes";
import {
  postLogin as postLoginValidator,
  postRegister as postRegisterValidator,
  putMe as putMeValidator,
} from "validators/auth";

const router = Router();
defineRoutes(router, [
  {
    method: "get",
    route: "/me",
    roles: ["admin", "business", "participant"],
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
    // validator: postRegisterVerificationValidator,
    controller: postRegisterVerificationController,
  },
  {
    method: "post",
    route: "/register",
    validator: postRegisterValidator,
    controller: postRegisterController,
  },
  {
    method: "put",
    route: "/me",
    roles: ["admin", "business", "participant"],
    validator: putMeValidator,
    controller: putMeController,
  },
]);

export default router;
