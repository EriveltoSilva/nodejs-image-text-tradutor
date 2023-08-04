const imagem        = document.getElementById("imagemProcessada");
const selectTag     = document.querySelectorAll("select");
const SelectorFicheiro   = document.getElementById("botaoUpload");
const botaoImaginalizar = document.getElementById("botaoProcessarImagem");
const labelProgresso = document.getElementById("valorProgresso");
const divProgresso = document.getElementById("progresso");
const contentorProgresso = document.querySelector(".contentor-progresso");
const botaoTraduzir = document.getElementById("botaoTraduzir");
const botaoLimpar   = document.getElementById("botaoClear");
const textareaDe    = document.getElementById("textareaDe");
const textareaPara  = document.getElementById("textareaPara");
const altoFalanteDe = document.getElementById("altoFalanteDe");
const altoFalantePara = document.getElementById("altoFalantePara");
const copiarDe = document.getElementById("copiarDe");
const copiarPara = document.getElementById("copiarPara");

SelectorFicheiro.onchange = () =>{
    var ficheiro  = SelectorFicheiro.files[0];
    //var imagemURL =  window.URL.createObjectURL(new Blob([ficheiro], {type:'image/jpg'}));
    var imagemURL = URL.createObjectURL(ficheiro);
    imagem.src = imagemURL;
}

botaoLimpar.addEventListener("click", () =>{
    textareaDe.value="";
    textareaPara.value = "";
    imagem.src = "../assets/image/imagem-inicio.png";
    labelProgresso.innerHTML ="";
    divProgresso.style.width ="0%";
    contentorProgresso.style.display="none";  
});

botaoImaginalizar.addEventListener("click",() =>{
    textareaDe.innerHTML = "";
    contentorProgresso.style.display="flex";
    contentorProgresso.style.flexDirection= "column";
    const rec = new Tesseract.TesseractWorker();
    rec.recognize(SelectorFicheiro.files[0])
        .progress(function(response){
            if(response.status == 'recognizing text'){
                labelProgresso.innerHTML = response.status+'-'+ ((Number(response.progress))*100) +"%";
                divProgresso.style.width = (Number(response.progress)*100) +"%";
            }
            else{
                labelProgresso.innerHTML = response.status;
            }
            console.log(response);
        }).then(function(data){
            textareaDe.value= data.text;
            labelProgresso.innerHTML = 'Feito';
            traduzir();
            console.log(data);
        })
});

selectTag.forEach((tag, id) =>{
    for(let codigoPais in paises){
        let selected = id == 0 ? codigoPais == "en-GB" ? "selected" : "" : codigoPais == "pt-PT" ? "selected" : "";
        let option = `<option ${selected} value="${codigoPais}">${paises[codigoPais]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});


botaoTraduzir.addEventListener("click", traduzir); 

function traduzir(){
    let texto = textareaDe.value.trim();
    let traduzirDe = selectTag[0].value;
    let traduzirPara = selectTag[1].value;

    if(!texto){
        window.alert("Sem texto para traduzir");
        return;
    }
    textareaPara.setAttribute("placeholder", "Traduzindo...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${texto}&langpair=${traduzirDe}|${traduzirPara}`;
    fetch(apiUrl).then(res => res.json()).then(data =>{
        // console.log(data);
        textareaPara.value = data.responseData.translatedText;
    });
};




altoFalanteDe.addEventListener("click", () =>{
    if(!textareaDe.value)
        window.alert("Sem Texto Convertido");
    else
    {
        let uterrance = new SpeechSynthesisUtterance(textareaDe.value);
        uterrance.lang = selectTag[0].value;
        speechSynthesis.speak(uterrance);
    }
});

altoFalantePara.addEventListener("click", () =>{
    if(!textareaPara.value)
        window.alert("Sem Texto Convertido");
    else{
        let uterrance = new SpeechSynthesisUtterance(textareaPara.value);
        uterrance.lang = selectTag[1].value;
        speechSynthesis.speak(uterrance);
    }
});


copiarDe.addEventListener("click", () => {
    if(!textareaDe.value)
        window.alert("Sem texto a ser copiado");
    else
        navigator.clipboard.writeText(textareaDe.value);
});

copiarPara.addEventListener("click", () => {
    if(!textareaPara.value)
        window.alert("Sem texto a ser copiado");
    else
        navigator.clipboard.writeText(textareaPara.value);
});