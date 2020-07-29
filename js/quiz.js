var homeBtn = document.getElementById("home");
var desistirBtn = document.getElementById("desistir");

function buttonListener1(ev) {

    switch(ev.currentTarget.id) {

    case "home":
        homeBtn.src = "assets/home1.png";
        break;
    case "desistir":
        desistirBtn.src = "assets/desistir1.png";
        break;
    }
}
function buttonListener2(ev) {

    switch(ev.currentTarget.id) {

    case "home":
        homeBtn.src = "assets/home.png";
        break;
    case "desistir":
        desistirBtn.src = "assets/desistir.png";
        break;
    }
}
function buttonListener3(ev) {

    switch(ev.currentTarget.id) {

    case "home":
        parent.parent.postMessage("1/over", '*');
        break;
    case "desistir":
        parent.parent.postMessage("26", '*');
        break;
    }
}
homeBtn.addEventListener("mouseover", buttonListener1); 
homeBtn.addEventListener("mouseout", buttonListener2);
homeBtn.addEventListener("click", buttonListener3);
desistirBtn.addEventListener("mouseover", buttonListener1); 
desistirBtn.addEventListener("mouseout", buttonListener2);
desistirBtn.addEventListener("click", buttonListener3);

var perguntas =[
    {
        pergunta: "Qual arma tem maior precisão?",
        respostas:{
            a: "Schofield",
            b: "Garrucha de Dois Canos",
            c: "Mauser Pistol"
        },
        certa: 'c'
    },

    {
        pergunta: "Quanto pesa um canhão?",
        respostas:{
            a: "40kg",
            b: "35kg",
            c: "32kg"
        },
        certa: 'a'
    },

    {
        pergunta: "Qual arma tem maior potência?",
        respostas:{
            a: "Rolling Block Rifle",
            b: "Winchester",
            c: "Thompson"
        },
        certa: 'c'
    },

    {
        pergunta: "Qual arma tem menor taxa de fogo?",
        respostas:{
            a: "Mauser Pistol",
            b: "Volcanic Pistol",
            c: "Garrucha de Dois Canos"
        },
        certa: 'b'
    },

    {
        pergunta: "Qual arma é mais pesada?",
        respostas:{
            a: "Schofield",
            b: "Volcanic Pistol",
            c: "Mauser Pistol"
        },
        certa: 'c'
    }
]

var quizContainer=document.getElementById('quiz');
var resultadosContainer=document.getElementById('resultados');
var submeterBotao= document.getElementById('submeter');


function mostraPerguntas(perguntas,quizContainer){
    var output= []
    var respostas;
    for (var i=0; i<perguntas.length;i++){
        respostas=[]; //resetar respostas
        for(letra in perguntas[i].respostas){
            //radio = escolhe so uma resposta
            respostas.push('<label>'+'<input type="radio" name="pergunta'+i+'" value="'+letra+'" >'+perguntas[i].respostas[letra]+'</label>');
        }
        output.push('<div class="pergunta">'+perguntas[i].pergunta+'</div>'+'<div class="respostas">'+respostas.join('  ')+'</div>');
    }

    quizContainer.innerHTML=output.join('');
}

function mostraResultados(perguntas,quizContainer,resultadosContainer){
    var respostaContainer=quizContainer.querySelectorAll('.respostas');
    var respostasDadas='';
    var corretas = 0;
    for( var i=0; i<perguntas.length;i++){
        respostasDadas = (respostaContainer[i].querySelector('input[name=pergunta'+i+']:checked')||{}).value;
        if(respostasDadas===perguntas[i].certa){
            corretas++;
            respostaContainer[i].style.color='green';
        }
        else{
            respostaContainer[i].style.color='red';
        }
    }

    if (corretas>=3){
        setTimeout(function(){resultadosContainer.innerHTML = 'Muito bem! Percebes disto.';},2000);
        setTimeout(function(){parent.parent.postMessage("25/5", '*');},5000);
    }
    else{
        setTimeout(function(){resultadosContainer.innerHTML='Acho que a teoria não é o teu forte...';},2000);
        setTimeout(function(){parent.parent.postMessage("25/0", '*');},5000);
    }
}

function geraQuiz(perguntas,resultadosContainer,submeterBotao,quizContainer){
    mostraPerguntas(perguntas,quizContainer);

    submeterBotao.onclick = function(){
        mostraResultados(perguntas,quizContainer,resultadosContainer);
        submeterBotao.style.display='none';
        setTimeout(function(){quizContainer.style.display='none';},2000);
    }
}
geraQuiz(perguntas,resultadosContainer,submeterBotao,quizContainer);