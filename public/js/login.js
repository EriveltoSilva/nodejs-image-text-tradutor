const URL_SERVER = "";
const email = document.getElementById('email');
const senha = document.getElementById('senha');
const botaoEntrar= document.getElementById('botaoEntrar');



botaoEntrar.addEventListener("click", (e)=>{
    e.preventDefault();
    let resultado = isValidado();
    if(resultado===null)
        ;//enviarDados();
    else
        Swal.fire('Validação de Login!',resultado,'error');
});


function isValidado(){
    let TAMANHO_MINIMO_SENHA = 4;
    let regex = /\S+@\S+\.\S+/;

    if(email.value==="")
        return "Campo Email Vazio!";
    else if(!regex.test(email.value))
        return "O email não está no formato: name@example.com! Retifique por favor.";
    else if(senha.value==="")
        return "Campo Senha Vazio!";
    else if(senha.value.length < TAMANHO_MINIMO_SENHA)
        return "A senha deve conter no mínimo "+TAMANHO_MINIMO_SENHA+" caracteres!";
    return null;
}

function enviarDados()
{
    fetch(URL_SERVER).then(resp => resp.json()).then(data=>{
       console.log("Resposta Recebida:"+data); 
    }).catch(exception=>{
        console.log("Erro:"+exception);
    });
}
