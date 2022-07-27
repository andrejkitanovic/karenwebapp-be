import { RequestHandler } from 'express';

import i18n from 'helpers/i18n';
import { queryFilter } from 'helpers/filters';
import { createMeta } from 'helpers/meta';

// MODELS
import Comment from 'models/comment';
import Post from 'models/post';

// ACTIONS
import { createCommentNotification } from './notification';

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
		const { post: postId, content } = req.body;

		const comment = await Comment.create({
			user: id,
			post: postId,
			content,
		});
		await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

		await createCommentNotification(id, postId);

		res.json({
			message: i18n.__('CONTROLLER.COMMENT.POST_COMMENT.CREATED'),
		});
	} catch (err) {
		next(err);
	}
};

export const deleteComment: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.params;

		const comment = await Comment.findByIdAndDelete(id);
		await Post.findByIdAndUpdate(comment?.post, { $pull: { comments: id } });

		res.json({
			message: i18n.__('CONTROLLER.COMMENT.DELETE_COMMENT.DELETED'),
		});
	} catch (err) {
		next(err);
	}
};
