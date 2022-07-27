import { Router } from 'express';
import defineRoutes from 'helpers/defineRoutes';

import {
	getNotifications as getNotificationsController,
} from 'controllers/notification';

const router = Router();
defineRoutes(router, [
	{
		method: 'get',
		route: '/',
		roles: ['participant', 'business', 'admin'],
		permissions: ['read:notifications'],
		controller: getNotificationsController,
	},
]);

export default router;
