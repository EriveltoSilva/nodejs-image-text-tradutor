export function maintanance(req, resp, next, maintanance) {
    if(maintanance==true) 
        resp.render('error.ejs', {title:'Página em Manutenção', maintanance:true})
    else
        next(); 
}

export function objectGenericResponse(status, message, data=[], numRowAffected=0, date=new Date().toLocaleString()) {
    return ({"status": status, "message":message, "data":data, "numRowAffected": numRowAffected, "date": date});
}
