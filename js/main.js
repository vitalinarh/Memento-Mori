"use strict";
 
(function(){
    window.addEventListener("load", main);
}());

//Inicializar o karma.
var karma = 0;

function main() {

    var startPage = 0;
    
    showPage(startPage);
    window.addEventListener("message", messageHandler);
}
 
function showPage(pageNum) {

    var frm = document.getElementsByTagName("iframe")[0];

    var audio = document.getElementsByTagName("audio")[0];
    audio.play(); 

    if(pageNum === 0)
        frm.src = "intro.html";

    if(pageNum === 1)
        frm.src = "mainMenu.html";

    else if(pageNum === 2) {
        frm.src = "limbo.html";
        audio.src = "audio/limbo.mp3";
        audio.play();
    }
    else if(pageNum === 3) {
        frm.src = "chapter1.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 4) 
        frm.src = "options.html";
    
    else if(pageNum === 5)
        frm.src = "credits.html";
    
    else if(pageNum === 6) {
        audio.volume = 0;
        window.close();
    }
    else if(pageNum === 7) {
        frm.src = "help.html";
    }
    else if(pageNum === 8) {
        frm.src = "help1.html";
    }
    else if(pageNum === 10) {        
        frm.src = "levels/nivel1.html";
        audio.src = "levels/audio/plataforma1.mp3";
        audio.play();
    }
    else if(pageNum === 11) {
        frm.src = "levels/nivel2.html";
        audio.src = "levels/audio/nivel2.mp3";
        audio.play();
    }
    else if(pageNum === 12) {
        frm.src = "chapter2.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 13) {
        frm.src = "gameOver1.html";
        audio.src = "audio/gameover.mp3";
        audio.play();
    }
    else if(pageNum === 14) {
        frm.src = "memoria.html";
        audio.src = "audio/puzzle.mp3";
        audio.play();
    }
    else if(pageNum === 15) {
        frm.src = "puzzle.html";
        audio.src = "audio/puzzle.mp3";
        audio.play();
    }
    else if(pageNum === 16) {
        frm.src = "escolha11.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 17) {
        frm.src = "escolha12.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 18) {
        frm.src = "chapter3.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 19) {
        frm.src = "escolha21.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 20) {
        frm.src = "escolha22.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 21) {
        frm.src = "levels/nivel3.html";
        audio.src = "levels/audio/nivel3.mp3";
        audio.play();
    }
    else if(pageNum === 22) {
        frm.src = "quiz.html";
        audio.src = "audio/puzzle.mp3";
        audio.play();
    }
    else if(pageNum === 23) {
        frm.src = "gameOver2.html";
    }
    else if(pageNum === 24) {
        frm.src = "guerra.html";
        audio.src = "audio/puzzle.mp3";
        audio.play();
    }
    else if(pageNum === 25) {
        frm.src = "escolha31.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 26) {
        frm.src = "escolha32.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 27) {
        frm.src = "chapter4.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 28) {
        frm.src = "levels/nivel4.html";
        audio.src = "levels/audio/nivel4.mp3";
        audio.play();
    }
    else if(pageNum === 29) {
        frm.src = "gameOver3.html";
        audio.src = "audio/gameover.mp3";
        audio.play();
    }
    else if(pageNum === 31) {
        frm.src = "escolha4.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 32) {
        frm.src = "chapter5.html";
        audio.src = "audio/chapter.mp3";
        audio.play();
    }
    else if(pageNum === 33) {
        frm.src = "levels/nivel5.html";
        audio.src = "levels/audio/nivel5.mp3";
        audio.play();
    }
    else if(pageNum === 34) {
        audio.src = "audio/final.mp3";
        audio.play();
        if(karma >= 65)
            frm.src = "ceu.html";            
        else
            frm.src = "inferno.html";
    }

    var loaded = function(ev) {
        frm.contentWindow.postMessage("", '*');
    }
    //Quando a iframe estiver carregada, mandar uma mensagem a avisar.
    frm.addEventListener("load", loaded);
}
 
function hidePage(pageNum) {
    var frm = document.getElementsByTagName("iframe")[0];
    frm.src = "";
}

function messageHandler(ev) {
    var str = ev.data;
    var audio = document.getElementsByTagName("audio")[0];

    if(str == "musicUp") {
        audio.volume += 0.1;
    }
    else if(str == "musicDown") {
        audio.volume -= 0.1;
    }
    else if(str == "muteSom") {
        //som.volume = 0;
    }
    else if(str == "muteMusica") {
        audio.volume = 0;
    }
    else if(str == "pauseMusica") {
        audio.pause();
    }
    else {
        var split = str.split("/");

        if(split.length > 1) {
            if(split[1] == "over") {
                karma = 0;
            }
            else {
                karma += parseInt(split[1]);
                console.log(karma);
            }
        }
        changePage(ev, parseInt(split[0]));
    }
}

function changePage(ev, newPageNum) {
    var frm = document.getElementsByTagName("iframe")[0];
    var frmName = frm.src;
    var pageNum = Number(frmName.charAt(frmName.length-6));
 
    hidePage(pageNum);
    showPage(newPageNum);
}