import dayjs from "dayjs";
import { RequestHandler } from "express";

const logger: RequestHandler = (req, res, next) => {
  const { method, baseUrl, headers } = req;
  const language = headers["accept-language"] || "en";
  console.log(
    `[${method}] ${baseUrl} | ${language.toUpperCase()} | ${dayjs().format(
      "HH:mm:ss DD/MM/YYYY"
    )}`
  );

  next();
};

export default logger;
