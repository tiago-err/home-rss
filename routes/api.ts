import {Express} from "express-serve-static-core";
import * as IndexController from "../controllers/index.controller";
import * as CinemaController from "../controllers/cinemas.controller";
import * as TrashController from "../controllers/trash.controller";
import * as IPTVController from "../controllers/iptv.controller";
import {validate} from "../middlewares/validators/wrapper.validator";
import {indexValidator} from "../middlewares/validators/index.validations";

/**
 *
 * @param app
 */
export const api = (app: Express) => {
	app.get("/cinemas", CinemaController.movies);
	app.get("/cinemas/names", CinemaController.movieNames);
	app.get("/cinemas/feed", CinemaController.feed);

	app.get("/trash", TrashController.trash);
	app.get("/day", (req, res) => {
		res.send({isWeekday: new Date().getDay() != 0 && new Date().getDay() != 6});
	});
	app.get("/iptv", IPTVController.index);
};
