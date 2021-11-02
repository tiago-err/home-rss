import {BASE_CINEMA_URL} from "../constants/cinemas.constants";
import {IMovie, IMovieResult} from "../interfaces/cinemas.interface";

export const parseMovieResult = (movie: IMovieResult): IMovie => {
	const properties = movie.Properties.map((property) => ({code: property.Code, value: property.Value}));
	const formattedProperties = {
		ageRating: properties.find((property) => property.code.toLowerCase() === "ageclass")?.value || "",
		duration: parseInt(properties.find((property) => property.code.toLowerCase() === "duration")?.value || "0"),
		gender: properties.find((property) => property.code.toLowerCase() === "gender")?.value || "",
		trailer: properties.find((property) => property.code.toLowerCase() === "youtubetrailer")?.value || "",
	};

	return {
		code: movie.Code,
		name: movie.Name,
		image: BASE_CINEMA_URL + movie.ImageUrl,
		formattedName: movie.NameWithFormatAndVersion,
		premiereDate: new Date(parseInt((movie.PremiereDate.match(/\d/g) || []).join(""))) || new Date(),
		link: BASE_CINEMA_URL + movie.Link,
		...formattedProperties,
	};
};
