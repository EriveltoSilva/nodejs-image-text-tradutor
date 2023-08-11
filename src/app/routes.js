import {Router} from 'express';
import UserController from '../controllers/UserController.js';

const routes = Router();

/** Application Routes **/
routes.get('/', (req, resp) => {resp.render('welcome.ejs');}); 
routes.get('/login', (req, resp) =>resp.render('login.ejs'));
routes.get('/main/:id', (req, resp)=>resp.render('main.ejs', {id:req.params.id}));

routes.post('/login/user', UserController.login);
routes.get('/create-account', UserController.create);
routes.post('/user/create', UserController.store);

// routes.get('/person/list', UserController.create);

routes.get('/about', (req, resp)=>resp.render('about.ejs'));
routes.get('/contacts', (req, resp)=>resp.render('contacts.ejs'));


routes.use((req, resp)=> resp.render('404.ejs'));
export default routes;