import { Router } from 'express';
import defineRoutes from 'helpers/defineRoutes';

import {
	getComments as getCommentsController,
	postComment as postCommentController,
	deleteComment as deleteCommentController,
	postCommentReply as postCommentReplyController
} from 'controllers/comment';

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
	{
		method: 'delete',
		route: '/:id',
		roles: ['participant', 'business', 'admin'],
		permissions: ['delete:comments'],
		controller: deleteCommentController,
	},
	{
		method: 'post',
		route: '/:id/reply',
		roles: ['participant', 'business', 'admin'],
		permissions: ['write:comments'],
		controller: postCommentReplyController,
	},
]);

export default router;
