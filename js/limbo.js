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
		parent.parent.postMessage("3", '*');	
	}
	
	skip.addEventListener("mouseover", skipListener1);
	skip.addEventListener("mouseout", skipListener2);
	skip.addEventListener("click", skipListener3);
	
	letraALetra(fala, "Desconhecido", "...", 140);

	//O setTimeOut simula um wait. Após apenas 3000ms é que se escreve a próxima fala, o que impede que as falas se sobreponham.
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Estás aí?", 120);
	}, 3000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "...", 140);
	}, 6000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "...", 500);
	}, 9000);
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "ACORDA!", 100);
	}, 12000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		document.getElementById("box").style.visibility = "hidden";
	}, 15300);

	setTimeout(function(){
		document.getElementById("box").style.visibility = "visible";
		letraALetra(fala, "Benjamin", "O...Onde é que eu estou?", 100);
	}, 21300);
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "Quem és tu?", 100);
	}, 24200);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		document.getElementById("box").style.visibility = "hidden";
	}, 25600);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		document.getElementById("box").style.visibility = "visible";
		letraALetra(fala, "Desconhecido", "Não há tempo para tantas perguntas.", 100);
	}, 29300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		document.getElementById("box").style.visibility = "visible";
		letraALetra(fala, "Desconhecido", "Tem sido uma altura complicada.", 100);
	}, 33000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "O que é que se passa?!?", 100);
	}, 37000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		document.getElementById("box").style.visibility = "visible";
		letraALetra(fala, "Benjamin", "O que é que me vão fazer?!?", 100);
	}, 40000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		document.getElementById("box").style.visibility = "visible";
		letraALetra(fala, "Desconhecido", "Não precisas de ter medo agora.", 100);
	}, 44500);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "A tua hora chegou, Benjamin.", 100);
	}, 48000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "Como assim?!?", 100);
	}, 51300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Anda, não há tempo a perder.", 100);
	}, 54300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Não podemos ficar aqui por muito tempo.", 100);
	}, 57300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Está na altura de decidirmos o teu destino final.", 100);
	}, 61300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Recordemos a tua vida...", 100);
	}, 67000);

	setTimeout(function(){
		//Enviar uma mensagem à main para sair do limbo.
		parent.parent.postMessage('3', '*');
	}, 76000);
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
