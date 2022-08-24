import utf8 from 'utf8';
import axios from 'axios';

/*
    Format such as: POSTCODE, CITY, ADDRESS, NAME
*/
export const googleGetLocation = async (address: string) => {
	try {
		const query = utf8.encode(address);
		const url = `https://maps.googleapis.com/maps/api/geocode/json`;
		const { data }: any = await axios.get(url, {
			params: {
				address: query,
				key: process.env.GOOGLE_APIKEY,
			},
		});

		if (!data?.results?.length || !data?.results[0]?.geometry?.location) return null;
		const location = data.results[0].geometry.location;

		return location;
	} catch (err: any) {
		throw new Error(err);
	}
};

export const googleGetCordinatesAddress = async (lat: number | string, lng: number | string) => {
	try {
		const url = `https://maps.googleapis.com/maps/api/geocode/json`;
		const { data }: any = await axios.get(url, {
			params: {
				latLng: `${lat},${lng}`,
				key: process.env.GOOGLE_APIKEY,
			},
		});

		if (!data?.results?.length || !data?.results[0]?.formatted_address) return null;
		const address = data.results[0].formatted_address;

		return address;
	} catch (err: any) {
		throw new Error(err);
	}
};

export const googleSearchLocations = async (address: string) => {
	try {
		const query = utf8.encode(address);
		const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json`;
		const { data }: any = await axios.get(url, {
			params: {
				inputtype: 'textquery',
				input: query,
				key: process.env.GOOGLE_APIKEY,
				fields: 'formatted_address,name,geometry',
			},
		});

		if (!data?.candidates?.length) return null;
		const results = data.candidates;

		const locations = results.map((result: any) => ({
			address: `${result.name} - ${result.formatted_address}`,
			location: result.geometry.location,
		}));

		return locations;
	} catch (err: any) {
		throw new Error(err);
	}
};
