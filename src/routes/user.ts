import { Router } from 'express';
import defineRoutes from 'helpers/defineRoutes';

import { getUsers as getUsersController } from 'controllers/user';

const router = Router();
defineRoutes(router, [
	{
		method: 'get',
		route: '/',
		roles: ['admin'],
		permissions: ['read:users'],
		controller: getUsersController,
	},
]);

export default router;
