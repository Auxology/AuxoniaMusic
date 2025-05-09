import {Router} from "express";
import {apiTokenProtection, isAuthenticated} from "../middlewares/routeProtection";
import {generatePlaylist} from "../controllers/serviceController";

const serviceRoute:Router = Router();

serviceRoute.post("/generate-playlist", isAuthenticated, apiTokenProtection, generatePlaylist)

export default serviceRoute;