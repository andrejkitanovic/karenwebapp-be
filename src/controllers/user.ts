import { RequestHandler } from "express";
import { queryFilter } from "helpers/filters";
import { createMeta } from "helpers/meta";
import User, { IUser } from "models/user";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.auth;

    const { data: users, count } = await queryFilter({
      Model: User,
      query: req.query,
      searchFields: ["name", "email"],
      defaultFilters: { _id: { $ne: id } },
    });

    res.json({
      data: users,
      meta: createMeta({ count }),
    });
  } catch (err) {
    next(err);
  }
};

// export const putUser: RequestHandler = async (req, res, next) => {
// 	try {
// 		const { id } = req.params;
// 		const { role, email, name } = req.body;

// 		await User.findByIdAndUpdate(id, {
// 			role,
// 			email,
// 			name,
// 		});

// 		res.json({
// 			message: i18n.__('CONTROLLER.USER.PUT_USER.UPDATED'),
// 		});
// 	} catch (err) {
// 		next(err);
// 	}
// };

export const deleteUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({
      message: i18n.__("CONTROLLER.USER.DELETE_USER.DELETED"),
    });
  } catch (err) {
    next(err);
  }
};

export const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = (await User.findById(id)) as IUser;
    // await user.withCompany();

    res.json({
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const postFollowUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.auth;
    const { id: followId } = req.params;

    const user = await User.findById(followId);
    const isFollowing = user?.followers.includes(id);

    await User.findByIdAndUpdate(id, {
      [isFollowing ? `$pull` : `$addToSet`]: { following: followId },
    });
    await User.findByIdAndUpdate(followId, {
      [isFollowing ? `$pull` : `$addToSet`]: { followers: id },
    });

    res.json({
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const getSingleUserFollowers: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate("followers")
      .select("followers");

    res.json({
      data: user?.followers,
    });
  } catch (err) {
    next(err);
  }
};

export const getSingleUserFollowing: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .populate("following")
      .select("following");

    res.json({
      data: user?.following,
    });
  } catch (err) {
    next(err);
  }
};
