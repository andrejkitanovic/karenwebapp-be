import { Router } from 'express';
import defineRoutes from 'helpers/defineRoutes';

import {
	getPosts as getPostsController,
	postPost as postPostController,
	deletePost as deletePostController,
	postDownvotePost as postDownvotePostController,
	postUpvotePost as postUpvotePostController,
} from 'controllers/post';

const router = Router();
defineRoutes(router, [
	{
		method: 'get',
		route: '/',
		roles: ['participant', 'business', 'admin'],
		permissions: ['read:posts'],
		controller: getPostsController,
	},
	{
		method: 'post',
		route: '/',
		roles: ['participant', 'business', 'admin'],
		permissions: ['write:posts'],
		controller: postPostController,
	},
	{
		method: 'delete',
		route: '/:id',
		roles: ['participant', 'business', 'admin'],
		permissions: ['delete:posts'],
		controller: deletePostController,
	},
	{
		method: 'post',
		route: '/upvote/:id',
		roles: ['participant', 'business', 'admin'],
		permissions: ['write:posts'],
		controller: postUpvotePostController,
	},
	{
		method: 'post',
		route: '/downvote/:id',
		roles: ['participant', 'business', 'admin'],
		permissions: ['write:posts'],
		controller: postDownvotePostController,
	},
]);

export default router;
