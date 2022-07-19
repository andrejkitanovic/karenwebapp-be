import { Router } from 'express';
import defineRoutes from 'helpers/defineRoutes';

import {
	getUsers as getUsersController,
	deleteUser as deleteUserController,
	getSingleUser as getSingleUserController,
} from 'controllers/user';

const router = Router();
defineRoutes(router, [
	{
		method: 'get',
		route: '/',
		roles: ['admin'],
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
		roles: ['admin'],
		permissions: ['read:users'],
		controller: getSingleUserController,
	},
]);

export default router;
