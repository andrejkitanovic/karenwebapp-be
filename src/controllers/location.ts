import { RequestHandler } from 'express';

import { googleGetCordinatesAddress, googleGetLocation, googleSearchLocations } from 'utils/google';

export const getLocation: RequestHandler = async (req, res, next) => {
	try {
		const { address } = req.query;

		const location = await googleGetLocation(address as string);

		res.json({
			data: location,
		});
	} catch (err) {
		next(err);
	}
};

export const getSearchLocations: RequestHandler = async (req, res, next) => {
	try {
		const { address } = req.query;

		const locations = await googleSearchLocations(address as string);

		res.json({
			data: locations,
		});
	} catch (err) {
		next(err);
	}
};

export const getCordinatesAddress: RequestHandler = async (req, res, next) => {
	try {
		const { lat, lng } = req.query;

		const address = await googleGetCordinatesAddress(lat as string, lng as string);
		console.log(address);

		res.json({
			data: address,
		});
	} catch (err) {
		next(err);
	}
};
