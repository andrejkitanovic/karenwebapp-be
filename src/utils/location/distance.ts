type Point = {
	lat: number;
	lng: number;
};

const deg2rad = (deg: number) => {
	return deg * (Math.PI / 180);
};

export const getDistanceBetweenPoints = (point1: Point, point2: Point, measurment: 'mile' | 'km' = 'mile') => {
	const { lat: lat1, lng: lng1 } = point1;
	const { lat: lat2, lng: lng2 } = point2;

	const R = measurment === 'km' ? 6371 : 3959; // Radius of earth KM | MILES

	const dLat = deg2rad(lat2 - lat1);
	const dLon = deg2rad(lng2 - lng1);
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	const distance = R * c;

	return distance;
};
