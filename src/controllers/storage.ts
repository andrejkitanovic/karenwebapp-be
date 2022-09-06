// import fs from "fs";

import { RequestHandler } from "express";
import Post from "models/post";

export const getUploads: RequestHandler = async (req, res, next) => {
  try {
    const posts = await Post.find().select("attachments");
    const attachments = posts.map((post) => post.attachments).flat();

    // const uploads = fs
    //   .readdirSync("./uploads")
    //   .map((upload) => `uploads/${upload}`);

    res.json({
      data: attachments,
    });
  } catch (err) {
    next(err);
  }
};
