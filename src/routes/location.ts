import {
  getCordinatesAddress as getCordinatesAddressController,
  getLocation as getLocationController,
  getSearchLocations as getSearchLocationsController,
} from "controllers/location";
import { Router } from "express";
import defineRoutes from "helpers/defineRoutes";
import {
  getCordinatesAddress as getCordinatesAddressValidator,
  getLocation as getLocationValidator,
  getSearchLocations as getSearchLocationsValidator,
} from "validators/location";

const router = Router();
defineRoutes(router, [
  {
    method: "get",
    route: "/",
    roles: ["participant", "business", "admin"],
    validator: getLocationValidator,
    controller: getLocationController,
  },
  {
    method: "get",
    route: "/search",
    roles: ["participant", "business", "admin"],
    validator: getSearchLocationsValidator,
    controller: getSearchLocationsController,
  },
  {
    method: "get",
    route: "/address",
    roles: ["participant", "business", "admin"],
    validator: getCordinatesAddressValidator,
    controller: getCordinatesAddressController,
  },
]);

export default router;
