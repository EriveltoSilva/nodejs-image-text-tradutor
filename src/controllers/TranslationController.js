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

}

export default new TranslationController();