import { RequestHandler } from 'express';

import i18n from 'helpers/i18n';
import { queryFilter } from 'helpers/filters';
import { createMeta } from 'helpers/meta';
import Post from 'models/post';

export const getPosts: RequestHandler = async (req, res, next) => {
	try {
		// const { id } = req.auth;

		const { data: posts, count } = await queryFilter({
			Model: Post,
			query: req.query,
			populate: 'user',
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

export const postPost: RequestHandler = async (req, res, next) => {
	try {
		const { id } = req.query;
		const { content } = req.body;

		await Post.create({
			user: id,
			content,
		});

		res.json({
			message: i18n.__('CONTROLLER.POST.POST_POST.CREATED'),
		});
	} catch (err) {
		next(err);
	}
};
