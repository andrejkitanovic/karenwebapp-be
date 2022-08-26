import { RequestHandler } from "express";
import { queryFilter } from "helpers/filters";
import i18n from "helpers/i18n";
import { createMeta } from "helpers/meta";
import Comment from "models/comment";
import Post, { PostCategoryEnum } from "models/post";
import User from "models/user";

export const getPosts: RequestHandler = async (req, res, next) => {
  try {
    const { data: posts, count } = await queryFilter({
      Model: Post,
      query: req.query,
      populate: [
        {
          path: "comments",
          populate: {
            path: "user",
          },
        },
        {
          path: "comments",
          populate: {
            path: "replies",
          },
        },
        {
          path: "comments",
          populate: {
            path: "replies",
            populate: {
              path: "user",
            },
          },
        },
        {
          path: "user",
        },
      ],
      searchFields: ["involved", "content"],
    });

    res.json({
      data: posts,
      meta: createMeta({ count }),
    });
  } catch (err) {
    next(err);
  }
};

export const postPost: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.auth;
    const { category, involved, opinion, content } = req.body;

    await Post.create({
      user: id,
      category,
      involved,
      opinion,
      content,
    });

    res.json({
      message: i18n.__("CONTROLLER.POST.POST_POST.CREATED"),
    });
  } catch (err) {
    next(err);
  }
};

export const deletePost: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Comment.deleteMany({ post: id });
    await Post.findByIdAndDelete(id);

    res.json({
      message: i18n.__("CONTROLLER.POST.DELETE_POST.DELETED"),
    });
  } catch (err) {
    next(err);
  }
};

export const getPostsCategoryCount: RequestHandler = async (req, res, next) => {
  try {
    const data: { [category: string]: number } = {};

    for await (const category of Object.values(PostCategoryEnum)) {
      data[category] = await Post.count({ category });
    }
    data.total = await Post.count();

    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
};

export const postUpvotePost: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.auth;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);
    const hasUpvoted = post?.votes.up.includes(id);

    await Post.findByIdAndUpdate(postId, {
      [hasUpvoted ? `$pull` : `$addToSet`]: { "votes.up": id },
    });

    const hasDownvoted = post?.votes.down.includes(id);
    if (hasDownvoted) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { "votes.down": id },
      });
    }

    res.json({
      message: i18n.__("CONTROLLER.POST.POST_UPVOTE_POST.UPVOTED"),
    });
  } catch (err) {
    next(err);
  }
};

export const postDownvotePost: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.auth;
    const { id: postId } = req.params;

    const post = await Post.findById(postId);
    const hasDownvoted = post?.votes.down.includes(id);

    await Post.findByIdAndUpdate(postId, {
      [hasDownvoted ? `$pull` : `$addToSet`]: { "votes.down": id },
    });

    const hasUpvoted = post?.votes.up.includes(id);
    if (hasUpvoted) {
      await Post.findByIdAndUpdate(postId, {
        $pull: { "votes.up": id },
      });
    }

    res.json({
      message: i18n.__("CONTROLLER.POST.POST_DOWNVOTE_POST.DOWNVOTED"),
    });
  } catch (err) {
    next(err);
  }
};

export const getPinnedPosts: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.auth;

    const user = await User.findById(id).select("pinnedPosts");
    const { data: posts, count } = await queryFilter({
      Model: Post,
      query: req.query,
      populate: [
        {
          path: "comments",
          populate: {
            path: "user",
          },
        },
        {
          path: "user",
        },
      ],
      searchFields: ["involved", "content"],
      defaultFilters: { _id: { $in: user?.pinnedPosts } },
    });

    res.json({
      data: posts,
      meta: createMeta({ count }),
    });
  } catch (err) {
    next(err);
  }
};

export const postPinPost: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.auth;
    const { id: postId } = req.params;

    const user = await User.findById(id).select("pinnedPosts");
    const isPinned = user?.pinnedPosts?.includes(postId);

    await User.findByIdAndUpdate(id, {
      [isPinned ? `$pull` : `$addToSet`]: { pinnedPosts: postId },
    });

    res.json({
      // message: i18n.__('CONTROLLER.POST.POST_DOWNVOTE_POST.DOWNVOTED'),
    });
  } catch (err) {
    next(err);
  }
};
