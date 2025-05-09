import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config/config';


import ApiTokenRoute from "./routes/apiTokenRoute";
import serviceRoute from "./routes/serviceRoute";

import {errorHandler} from "./middlewares/errorHandler";


const app = express();

app.use(express.json());
app.use(cors(
    {
        origin: config.origin,
        credentials: true
    }
));
app.use(cookieParser());

// Routes
app.use("/api/token", ApiTokenRoute)
app.use("/api/service", serviceRoute)

// Global error handler (should be after routes)
app.use(errorHandler);


export default app;