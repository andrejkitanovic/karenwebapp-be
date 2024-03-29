import { RequestHandler } from "express";
import { queryFilter } from "helpers/filters";
import { createMeta } from "helpers/meta";
// MODELS
import Notification from "models/notification";
import Post, { IPost } from "models/post";
import User, { IUser } from "models/user";
import { sendEmailNotification } from "utils/mailer";

export const getNotifications: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.auth;

    const { data: notifications, count } = await queryFilter({
      Model: Notification,
      query: req.query,
      populate: [
        {
          path: "target",
        },
      ],
      searchFields: ["content"],
      defaultFilters: { user: id },
    });

    await Notification.updateMany(
      {
        user: id,
      },
      {
        opened: true,
      }
    );

    res.json({
      data: notifications,
      meta: createMeta({ count }),
    });
  } catch (err) {
    next(err);
  }
};

export const createCommentNotification = async (
  userId: string,
  postId: IPost
) => {
  const post = (await Post.findById(postId)) as IPost;
  const user = (await User.findById(post.user)) as IUser;

  if (post.user.toString() === userId) return;

  await Notification.create({
    user: post.user,
    target: userId,
    type: "comment",
  });

  await sendEmailNotification({
    email: user.email,
  });
};
