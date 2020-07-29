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
		parent.parent.postMessage("22", '*');	
	}
	
	skip.addEventListener("mouseover", skipListener1);
	skip.addEventListener("mouseout", skipListener2);
	skip.addEventListener("click", skipListener3);
	
	letraALetra(fala, "Desconhecido", "...", 140);

	//O setTimeOut simula um wait. Após apenas 3000ms é que se escreve a próxima fala, o que impede que as falas se sobreponham.
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Hey, tu!", 100);
	}, 3000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "Estás a falar comigo?", 100);
	}, 6000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Sim, com quem havia de ser?", 100);
	}, 10000);
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "Sei lá...", 140);
	}, 14000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		document.getElementById("box").style.visibility = "hidden";
	}, 18000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		document.getElementById("box").style.visibility = "visible";
		letraALetra(fala, "Benjamin", "...", 140);
	}, 21000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "...", 140);
	}, 24000);
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "...", 140);
	}, 27000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "...", 140);
	}, 30000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "E tu quem és mesmo?", 100);
	}, 34000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido", "Ah! Esqueci-me de me apresentar! O meu nome é Ambrósio.", 100);
	}, 38000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "Nome estranho. Eu sou o Benjamin, prazer. O que é que querias de mim afinal?", 100);
	}, 44000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		document.getElementById("box").style.visibility = "visible";
		letraALetra(fala, "Ambrósio", "Vi-te a treinar, e acho que és um talento nato!", 100);
    }, 53000);
    
    setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		document.getElementById("box").style.visibility = "visible";
		letraALetra(fala, "Ambrósio", "Não conheço ninguém aqui e achei que devia fazer amizades como tu.", 100);
	}, 60000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		document.getElementById("box").style.visibility = "visible";
		letraALetra(fala, "Benjamin", "Nada interesseiro portanto. Mas aceito a proposta, também não conheço muita gente aqui.", 100);
	}, 68000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Ambrósio", "Perfeito!", 100);
	}, 77000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "...", 140);
	}, 79000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Ambrósio", "...", 140);
	}, 82000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "...", 100);
	}, 85000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Ambrósio", "Já sei!!", 100);
	}, 87000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Benjamin", "O quê???", 100);
	}, 89000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Ambrósio", "Já vi que és muito bom na parte prática. Agora vou testar o teu conhecimento teórico!", 100);
		skip.style.visibility = "hidden";
	}, 92000);

	setTimeout(function(){
	   fala.innerHTML = "";
	   parent.parent.postMessage("22", '*');
	}, 113000);
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
