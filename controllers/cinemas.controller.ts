import {Request, Response} from "express";

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
