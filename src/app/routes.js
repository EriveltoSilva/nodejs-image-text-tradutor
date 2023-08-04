import {Router} from 'express'


const routes = Router();

/** Application Routes **/
routes.get('/', (req, resp)=>{
    resp.render('welcome.ejs', {title:'My Lens Traductor - Welcome ', username:'Clénio Costa'});
}); 

routes.use((req, resp)=>{
    resp.render('404.ejs');
});

export default routes;