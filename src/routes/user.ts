import { Router } from 'express';
import defineRoutes from 'helpers/defineRoutes';

import {
	getUsers as getUsersController,
	deleteUser as deleteUserController,
	getSingleUser as getSingleUserController,
	postFollowUser as postFollowUserController,
	getSingleUserFollowers as getSingleUserFollowersController,
	getSingleUserFollowing as getSingleUserFollowingController,
} from 'controllers/user';

const router = Router();
defineRoutes(router, [
	{
		method: 'get',
		route: '/',
		roles: ['participant', 'business', 'admin'],
		permissions: ['read:users'],
		controller: getUsersController,
	},
	{
		method: 'delete',
		route: '/:id',
		roles: ['admin'],
		permissions: ['delete:users'],
		controller: deleteUserController,
	},
	{
		method: 'get',
		route: '/:id',
		roles: ['participant', 'business', 'admin'],
		permissions: ['read:users'],
		controller: getSingleUserController,
	},
	{
		method: 'post',
		route: '/follow/:id',
		roles: ['participant', 'business', 'admin'],
		permissions: ['write:users'],
		controller: postFollowUserController,
	},
	{
		method: 'get',
		route: '/followers/:id',
		roles: ['participant', 'business', 'admin'],
		permissions: ['read:users'],
		controller: getSingleUserFollowersController,
	},
	{
		method: 'get',
		route: '/following/:id',
		roles: ['participant', 'business', 'admin'],
		permissions: ['read:users'],
		controller: getSingleUserFollowingController,
	},
]);

export default router;
