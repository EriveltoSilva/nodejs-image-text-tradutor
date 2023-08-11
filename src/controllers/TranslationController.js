import { objectGenericResponse } from '../config/globalConfig.js';
import TranslationDAO from '../dao/TranslationDAO.js';

class TranslationController{
    create(req, resp)
    {
        let data = req.body;
        TranslationDAO.create(data).then((response)=>{
            return resp.json(objectGenericResponse('success', 'success', [], response));
        }).catch(error => {return resp.json(objectGenericResponse('error', error, [], 0))});
    }
    
    getTotalTranslations(req, resp)
    {
        let data = req.params.id;
        TranslationDAO.countMyTranslations(data)
        .then((response)=>{return resp.json(objectGenericResponse('success', 'success', response, 0))})
        .catch(error =>{return resp.json(objectGenericResponse('error', error, [], 0))});
    }
}

export default new TranslationController();