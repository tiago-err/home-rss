import {Request, Response} from "express";
import {successResponse} from "../helpers/methods";
import {splitEveryTwoLines} from "../helpers/iptv.helpers";
import {typeConditions} from "../constants/iptv.constants";
import axios from "axios";

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const index = async (req: Request, res: Response): Promise<void> => {
	const {
		query: {type},
	} = req;

	let formattedType: "movies" | "series" | "channels" | "all" = "movies";
	switch (type?.toString().toLowerCase()) {
		case "series":
			formattedType = "movies";
			break;
		case "channels":
			formattedType = "channels";
			break;
		case "all":
			formattedType = "all";
			break;
	}

	const result = await axios.get(process.env.IPTV_SOURCE || "");
	const lines = result.data.split("\n");

	const firstLine = lines.shift();
	const everyTwoLines = splitEveryTwoLines(lines);

	const playlistItems = everyTwoLines.filter(typeConditions[formattedType]).map((element: String[]) => element.join("\n"));
	res.send(`${firstLine}\n#PLAYLIST:${formattedType.toUpperCase()}\r\n${playlistItems.join("\n")}`);
};
