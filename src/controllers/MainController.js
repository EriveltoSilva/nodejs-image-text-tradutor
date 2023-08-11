import UserDAO from "../dao/UserDAO.js";

class MainController{
    getIn(req, resp)
    {
        UserDAO.findById(req.params.id)
        .then((user)=>{
            resp.render('main.ejs', {user});
        })
        .catch((error)=> resp.render('error.ejs', {error}));
    }
}

export default new MainController();