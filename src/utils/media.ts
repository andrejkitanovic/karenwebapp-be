import fs from "fs";

export const unlinkMedia = (path: string) => {
  if (fs.existsSync(path)) {
    return fs.unlink(path, (err) => {
      if (err) {
        throw new Error();
      }
    });
  }
  return false;
};
