import { query } from "express-validator";
import i18n from "helpers/i18n";

export const getLocation = [
  query("address", i18n.__("VALIDATOR.ADDRESS.REQUIRED")).notEmpty(),
];

export const getSearchLocations = [
  query("address", i18n.__("VALIDATOR.ADDRESS.REQUIRED")).notEmpty(),
];

export const getCordinatesAddress = [
  query("lat", i18n.__("VALIDATOR.LAT.REQUIRED")).notEmpty(),
  query("lng", i18n.__("VALIDATOR.LNG.REQUIRED")).notEmpty(),
];
