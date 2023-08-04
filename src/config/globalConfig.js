export function maintanance(req, resp, next, maintanance) {
    console.log('Entrou...');
    if(maintanance==true) 
        resp.render('error.ejs', {title:'Página em Manutenção', maintanance:true})
    else
        next(); 
}

