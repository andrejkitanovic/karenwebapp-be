import { Router } from 'express';
import defineRoutes from 'helpers/defineRoutes';

import { getPosts as getPostsController, postPost as postPostController } from 'controllers/post';

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
]);

export default router;
