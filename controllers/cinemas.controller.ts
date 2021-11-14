import {Request, Response} from "express";
import RSS from "rss";

import axios from "axios";
import {GET_MOVIES_URL} from "../constants/cinemas.constants";
import {IMovieResult} from "../interfaces/cinemas.interface";
import {parseMovieResult} from "../helpers/cinemas.helpers";

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const movies = async (req: Request, res: Response): Promise<void> => {
	const request = await axios.post(GET_MOVIES_URL, {});
	const data = request.data as {d: IMovieResult[]};

	const movies = data.d.map((movie) => parseMovieResult(movie));

	res.send(movies);
};

export const feed = async (req: Request, res: Response): Promise<void> => {
	const request = await axios.post(GET_MOVIES_URL, {});
	const data = request.data as {d: IMovieResult[]};
	const movies = data.d.map((movie) => parseMovieResult(movie));

	const rssFeed = new RSS({
		title: "Cinemas NOS",
		feed_url: "https://api.tiagorr.com/cinemas/feed",
		site_url: "https://cinemas.nos.pt",
		pubDate: new Date(),
	});

	movies.forEach((movie) => {
		rssFeed.item({
			title: movie.name,
			description: movie.formattedName,
			url: movie.link,
			guid: movie.code,
			categories: [movie.gender],
			date: movie.premiereDate,
			enclosure: {
				url: movie.image,
			},
		});
	});

	res.send(rssFeed.xml({indent: true}));
};

export const movieNames = async (req: Request, res: Response): Promise<void> => {
	const request = await axios.post(GET_MOVIES_URL, {});
	const data = request.data as {d: IMovieResult[]};

	const movies = data.d.map((movie) => parseMovieResult(movie).name);

	res.send(movies);
};
