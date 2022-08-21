import { Router } from 'express';
import defineRoutes from 'helpers/defineRoutes';

import {
	getLocation as getLocationController,
	getSearchLocations as getSearchLocationsController,
	getCordinatesAddress as getCordinatesAddressController,
} from 'controllers/location';

const router = Router();
defineRoutes(router, [
	{
		method: 'get',
		route: '/',
		roles: ['participant', 'business', 'admin'],
		controller: getLocationController,
	},
	{
		method: 'get',
		route: '/search',
		roles: ['participant', 'business', 'admin'],
		controller: getSearchLocationsController,
	},
	{
		method: 'get',
		route: '/address',
		roles: ['participant', 'business', 'admin'],
		controller: getCordinatesAddressController,
	},
]);

export default router;
