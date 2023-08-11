const image        = document.getElementById("imageLoaded");
const selectTag     = document.querySelectorAll("select");
const fileSelector   = document.getElementById("btnUploadImage");
const btnExtractText = document.getElementById("btnExtractImage");
const labelProgress = document.getElementById("progressValue");
const divProgress = document.getElementById("progress");
const progressContainer = document.querySelector(".progress-container");
const btnTranslate = document.getElementById("btnTranslate");
const btnClear   = document.getElementById("btnClear");
const sourceText    = document.getElementById("sourceText");
const finalText  = document.getElementById("finalText");
const sourceSpeaker = document.getElementById("sourceSpeaker");
const finalSpeaker = document.getElementById("finalSpeaker");
const sourceCopy = document.getElementById("sourceCopy");
const finalCopy = document.getElementById("finalCopy");

fileSelector.onchange = () =>{
    let file  = fileSelector.files[0];
    let imageURL = URL.createObjectURL(file);
    image.src = imageURL;
}

btnClear.addEventListener("click", () =>{
    sourceText.value="";
    finalText.value = "";
    image.src = "/image/imagem-inicio.png";
    labelProgress.innerHTML ="";
    divProgress.style.width ="0%";
    progressContainer.style.display="none";  
});

btnExtractText.addEventListener("click",() =>{
    sourceText.innerHTML = "";
    progressContainer.style.display="flex";
    progressContainer.style.flexDirection= "column";
    const rec = new Tesseract.TesseractWorker();
    rec.recognize(fileSelector.files[0])
        .progress(function(response){
            if(response.status == 'recognizing text'){
                labelProgress.innerHTML = response.status+'-'+ ((Number(response.progress))*100) +"%";
                divProgress.style.width = (Number(response.progress)*100) +"%";
            }
            else
                labelProgress.innerHTML = response.status;
            console.log(response);
        }).then(function(data){
            sourceText.value= data.text;
            labelProgress.innerHTML = 'Completo';
            translate();
            console.log(data);
        })
});

selectTag.forEach((tag, id) =>{
    for(let countryCod in paises){
        let selected = id == 0 ? countryCod == "en-GB" ? "selected" : "" : countryCod == "pt-PT" ? "selected" : "";
        let option = `<option ${selected} value="${countryCod}">${paises[countryCod]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});


btnTranslate.addEventListener("click", translate); 

function translate(){
    let text = sourceText.value.trim();
    let textFromSource = selectTag[0].value;
    let textToFinal = selectTag[1].value;

    if(!text){
        Swal.fire('Ups!', 'Sem texto para traduzir', 'warning');
        return;
    }
    finalText.setAttribute("placeholder", "Traduzindo...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${textFromSource}|${textToFinal}`;
    fetch(apiUrl).then(res => res.json()).then(data =>{
        // console.log(data);
        finalText.value = data.responseData.translatedText;
    });
};




sourceSpeaker.addEventListener("click", () =>{
    if(!sourceText.value)
        Swal.fire('Ups!', 'Sem Texto Convertido', 'warning');
    else
    {
        let uterrance = new SpeechSynthesisUtterance(sourceText.value);
        uterrance.lang = selectTag[0].value;
        speechSynthesis.speak(uterrance);
    }
});

finalSpeaker.addEventListener("click", () =>{
    if(!finalText.value)
        Swal.fire('Ups!', 'Sem Texto Convertido', 'warning');
    else{
        let uterrance = new SpeechSynthesisUtterance(finalText.value);
        uterrance.lang = selectTag[1].value;
        speechSynthesis.speak(uterrance);
    }
});


sourceCopy.addEventListener("click", () => {
    if(!sourceText.value)
        Swal.fire('Ups!', 'Sem texto a ser copiado', 'warning');
    else
        navigator.clipboard.writeText(sourceText.value);
});

finalCopy.addEventListener("click", () => {
    if(!finalText.value)
        Swal.fire('Ups!', 'Sem texto a ser copiado', 'warning');
    else
        navigator.clipboard.writeText(finalText.value);
});