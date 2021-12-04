export const typeConditions = {
	movies: (element: String[]): boolean => element[1].includes("movie"),
	series: (element: String[]): boolean => element[1].includes("series"),
	channels: (element: String[]): boolean => !element[1].includes("movie") && !element[1].includes("series"),
	all: () => true,
};
