export const createMeta = ({ page = 1, limit = 20, count }: { page?: number; limit?: number; count: number }) => {
	return {
		pagination: {
			currentPage: page,
			pageSize: limit,
			totalPages: Math.ceil(count / limit),
			totalResults: count,
		},
	};
};