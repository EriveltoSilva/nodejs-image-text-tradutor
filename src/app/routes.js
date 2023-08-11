import {Router} from 'express';
import UserController from '../controllers/UserController.js';
import TranslationController from '../controllers/TranslationController.js';
import MainController from '../controllers/MainController.js';

const routes = Router();

/** Application Routes **/
routes.get('/', (req, resp) => {resp.render('welcome.ejs');}); 
routes.get('/login', (req, resp) =>resp.render('login.ejs'));
routes.get('/about', (req, resp)=>resp.render('about.ejs'));
routes.get('/contacts', (req, resp)=>resp.render('contacts.ejs'));


routes.get('/create-account', UserController.create);
routes.get('/main/:id', MainController.getIn);
routes.post('/login/user', UserController.login);
routes.post('/user/create', UserController.store);
routes.post('/translation/create', TranslationController.create);


routes.use((req, resp)=> resp.render('404.ejs'));
export default routes;