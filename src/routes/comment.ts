import { Router } from 'express';
import defineRoutes from 'helpers/defineRoutes';

import { getComments as getCommentsController, postComment as postCommentController } from 'controllers/comment';

const router = Router();
defineRoutes(router, [
	{
		method: 'get',
		route: '/',
		roles: ['participant', 'business', 'admin'],
		permissions: ['read:comments'],
		controller: getCommentsController,
	},
	{
		method: 'post',
		route: '/',
		roles: ['participant', 'business', 'admin'],
		permissions: ['write:comments'],
		controller: postCommentController,
	},
]);

export default router;
