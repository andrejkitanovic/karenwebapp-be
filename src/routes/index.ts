import { Express } from "express";
import requireDir from "require-dir";

const dir = requireDir(__dirname);

export default function (app: Express) {
  Object.keys(dir).forEach((camelCaseName) => {
    const name = camelCaseName
      .split(/(?=[A-Z])/)
      .join("-")
      .toLowerCase();
    app.use(`/api/${name}`, dir[camelCaseName].default);
  });
}
