import {Request, Response} from "express";
import {TRASH_DAYS} from "../constants/trash.constants";

/**
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const trash = async (req: Request, res: Response): Promise<void> => {
	const date = new Date();
	const trashToday: undefined | {label: string; label_pt: string; color: string} = TRASH_DAYS[date.getDate() - 1];

	res.send(trashToday);
};
