import { RequestHandler } from 'express';

import i18n from 'helpers/i18n';
import { queryFilter } from 'helpers/filters';
import { createMeta } from 'helpers/meta';
import Comment from 'models/comment';
import Post from 'models/post';

export const getComments: RequestHandler = async (req, res, next) => {
	try {
		// const { id } = req.auth;

		const { data: posts, count } = await queryFilter({
			Model: Comment,
			query: req.query,
			// populate: ,
			// searchFields: ['name', 'email'],
			// defaultFilters: { _id: { $ne: id } },
		});

		res.json({
			data: posts,
			meta: createMeta({ count }),
		});
	} catch (err) {
		next(err);
	}
};

export const postComment: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.auth;
		const { post, content } = req.body;

		const comment = await Comment.create({
			user: id,
			post,
			content,
		});
		await Post.findByIdAndUpdate(post, { $push: { comments: comment } });

		res.json({
			message: i18n.__('CONTROLLER.COMMENT.POST_COMMENT.CREATED'),
		});
	} catch (err) {
		next(err);
	}
};
