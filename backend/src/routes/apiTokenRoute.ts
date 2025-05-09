import {Router} from 'express';
import {generateApiToken} from '../controllers/apiTokenController';
import {isAuthenticated} from "../middlewares/routeProtection";

const ApiTokenRoute:Router = Router();

ApiTokenRoute.post("/generate", isAuthenticated, generateApiToken)


export default ApiTokenRoute;