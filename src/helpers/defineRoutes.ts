import { IRouter, RequestHandler } from "express";
import { ValidationChain } from "express-validator";
import { PermissionsType } from "helpers/permissions";
import auth from "middlewares/auth";
import loggerMiddleware from "middlewares/logger";
import validatorMiddleware from "middlewares/validator";
import { RoleType } from "models/user";

interface IRoute {
  method: "get" | "post" | "put" | "patch" | "delete";
  route: string;
  roles?: RoleType[];
  permissions?: PermissionsType[];
  validator?: ValidationChain[];
  controller: RequestHandler;
}

const defineRoutes = (router: IRouter, routes: IRoute[]) => {
  routes.forEach(({ method, route, roles, validator, controller }) => {
    const additionalRoutes = [];

    if (roles) {
      additionalRoutes.push(auth(roles));
    }
    if (validator) {
      additionalRoutes.push(validator, validatorMiddleware);
    }

    router[method](route, loggerMiddleware, ...additionalRoutes, controller);
  });
};

export default defineRoutes;
