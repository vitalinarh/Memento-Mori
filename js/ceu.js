"use strict";

(function() {
	window.addEventListener("load", main);
}());

function main() {

	var fala = document.getElementById("fala");
	var skip = document.getElementById("skip");


	function skipListener1(ev) {
		skip.src = "assets/skip1.png";
	}
	function skipListener2(ev) {
		skip.src = "assets/skip.png";		
	}
	function skipListener3(ev) {
		parent.parent.postMessage("1/over", '*');	
	}
	
	skip.addEventListener("mouseover", skipListener1);
	skip.addEventListener("mouseout", skipListener2);
	skip.addEventListener("click", skipListener3);
	

	//O setTimeOut simula um wait. Após apenas 3000ms é que se escreve a próxima fala, o que impede que as falas se sobreponham.
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "E pronto, chegámos ao teu destino final.", 120);
	}, 8000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Tiveste uma vida interessante, de facto.", 120);
	}, 16000);
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Com vários obstáculos e escolhas difíceis.", 100);
	}, 22000);

	setTimeout(function(){
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "...", 100);
	}, 30000);

	setTimeout(function(){
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "...", 100);
	}, 32000);

	setTimeout(function(){
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "Onde estamos?", 100);
	}, 34000);
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Ah! No céu. É aqui que vais ficar para a eternidade.", 100);
	}, 39000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Parabéns, parece que no final das contas fizeste as escolhas certas.", 100);
		skip.style.visibility = "hidden";
	}, 46000);

	setTimeout(function(){
		//Enviar uma mensagem à main para sair do limbo.
		parent.parent.postMessage('1', '*');
	}, 55000);
}

//Fazer aparecer um determinado texto no ecrã, letra a letra.
function letraALetra(elem, personagem, texto, velocidade) {
    elem.innerHTML += personagem + ": ";
    
    var i = 0;
    var interval = setInterval(function(){
        elem.innerHTML += texto.charAt(i);
        i++;
        if(i > texto.length){
            clearInterval(interval);
        }
    }, velocidade);
}
