import { RequestHandler } from 'express';

import { queryFilter } from 'helpers/filters';
import { createMeta } from 'helpers/meta';

// MODELS
import Notification from 'models/notification';
import Post, { IPost } from 'models/post';

export const getNotifications: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.auth;

		const { data: notifications, count } = await queryFilter({
			Model: Notification,
			query: req.query,
			populate: [
				{
					path: 'target',
				},
			],
			searchFields: ['content'],
			defaultFilters: { user: id },
		});

		res.json({
			data: notifications,
			meta: createMeta({ count }),
		});
	} catch (err) {
		next(err);
	}
};

export const createCommentNotification = async (userId: string, postId: IPost) => {
	const post = (await Post.findById(postId)) as IPost;

	if (post.user !== userId) {
		await Notification.create({
			user: post.user,
			target: userId,
			type: 'comment',
		});
	}
};
