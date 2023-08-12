import UserDAO from "../dao/UserDAO.js";
import PersonDAO from "../dao/PersonDAO.js";
import { objectGenericResponse } from "../config/globalConfig.js";
import { response } from "express";
class UserController {
    /**
     * this function redirect to a create-account views
     * @param {*} req 
     * @param {*} resp 
     */
    create(req, resp) {
        resp.render('create-account.ejs');
    }

    /**
     * This function redirect to a edit-account views
     * @param {*} req 
     * @param {*} resp 
     */
    edit(req, resp) {
        resp.render('edit-account.ejs');
    }

    /**
     * This function list all users
     * @param {*} req 
     * @param {*} resp 
     */
    index(req, resp) {

    }

    /**
     * This function list one specific user
     * @param {*} req 
     * @param {*} resp 
     */
    show(req, resp) {
        let userId = req.params.id;
        UserDAO.findCompletedById(userId).then(user => {
            console.log(user);
            return resp.render('show-personal-datas.ejs', { user });
        }).catch(error => { resp.render('error.ejs') });
    }

    /**
     * This function create a user
     * @param {*} req 
     * @param {*} resp 
     */
    store(req, resp) {
        let dados = req.body;
        PersonDAO.create(dados)
            .then((response) => {
                PersonDAO.findId(dados)
                    .then((id) => {
                        dados.id_person = id;
                        UserDAO.create(dados)
                            .then((response) =>
                                resp.json(objectGenericResponse('success', 'success', [], response)))
                            .catch(error => resp.json(objectGenericResponse('error', error, [], 0)))
                    })
                    .catch((error) => resp.json(objectGenericResponse('error', error, [], 0)));
            })
            .catch((error) => resp.json(objectGenericResponse('error', error, [], 0)));
    }

    /**
     * This function update a specific user
     * @param {*} req 
     * @param {*} resp 
     */
    update(req, resp) {
        let user = req.body;
        user.id = req.params.id;
        PersonDAO.update(user)
            .then(response => {
                UserDAO.update(user).then(response => {
                    console.log(response);
                    return resp.json(objectGenericResponse('success', 'Dados Salvos com Sucesso!',user, response));
                }).catch(error => {
                    return resp.json(objectGenericResponse('error', error,[],0));
                })
            })
            .catch(error => {
                return resp.json(objectGenericResponse('error', error,[],0));
            });
    }

    /**
     * 
     * @param {*} req 
     * @param {*} resp 
     */
    destroy(req, resp) {
        
    }

    login(req, resp) {
        let user = req.body;
        console.log(user);
        UserDAO.isUser(user)
            .then((response) => {
                if (response.length > 0)
                    return resp.json(objectGenericResponse('success', 'success', response[0], 1));
                return resp.json(objectGenericResponse("warning", "Usuario Inválido", [], 0));
            })
            .catch((error) => {
                console.log(error);
                resp.json(objectGenericResponse('error', 'error', [], 0));
            });
    }
    getInEditAccount(req, resp) {
        UserDAO.findCompletedById(req.params.id)
            .then((user) => {
                resp.render('edit-account.ejs', { user });
            })

    }
}

export default new UserController()