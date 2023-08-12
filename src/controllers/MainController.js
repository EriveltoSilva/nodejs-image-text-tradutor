import TranslationDAO from "../dao/TranslationDAO.js";
import UserDAO from "../dao/UserDAO.js";

class MainController{
    getIn(req, resp)
    {
        UserDAO.findById(req.params.id)
        .then((user)=>{
            resp.render('main.ejs', {user});
        })
        .catch((error)=> resp.render('error.ejs', {title:'Erro Pegendo o User no Main GetIn', maintanance:false, error}));

    }

    getInMySearches(req, resp)
    {
        
        UserDAO.findById(req.params.id)
        .then((user)=>{
           
            TranslationDAO.findByUserId(user.id)
            .then(response=>{
                console.log(response);
                resp.render('my-searches.ejs', {user, translations:response});
            })
            .catch(error=>{
                console.error(error);
                resp.render('my-searches.ejs', {title:'Erro Pegando a Translation pelo user ID', maintanance:false, user, translations:[]});
            });
        })
        .catch((error)=> resp.render('error.ejs', {title:'Erro Pegando o User antes da trans',maintanance:false , error}));
    }
}

export default new MainController();