import express from 'express';
import morgan from 'morgan';
import routes from './routes.js'
import {maintanance} from '../config/globalConfig.js';

const MAINTANANCE = false;
const app = express(); 

/** Engine Register */
app.set('view engine', 'ejs');
app.set('views', 'views'); 

/** Middlewares Register**/ 
app.use(express.json());
app.use(morgan('tiny'));
app.use((req, resp, next)=>maintanance(req, resp, next, MAINTANANCE));
app.use(express.static('public'));
app.use(routes);

export default app;