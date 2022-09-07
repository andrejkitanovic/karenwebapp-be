import { param } from "express-validator";
import i18n from "helpers/i18n";
import Notification from "models/notification";

export const postReadNotification = [
  param("id", i18n.__("VALIDATOR.ID.REQUIRED"))
    .notEmpty()
    .custom(async (value: string) => {
      const notificationExists = await Notification.exists({ _id: value });

      if (!notificationExists) {
        throw new Error(i18n.__("VALIDATOR.NOTIFICATION.NOT_FOUND"));
      }

      return true;
    }),
];
