"use strict";

(function() {
	window.addEventListener("load", main);
}());

function main() {

	var jogarBtn = document.getElementById("jogar");
	var opcoesBtn = document.getElementById("opcoes");
	var creditosBtn = document.getElementById("creditos");
	var sairBtn = document.getElementById("sair");
	var ajudaBtn = document.getElementById("ajuda");

	function buttonListener1(ev) {

		switch(ev.currentTarget.id) {

		case "jogar":
			jogarBtn.src = "assets/jogar1.png";
			break;
		case "opcoes":
			opcoesBtn.src = "assets/opcoes1.png";
			break;
		case "creditos":
			creditosBtn.src = "assets/creditos1.png";
			break;
		case "sair":
			sairBtn.src = "assets/sair1.png";
			break;
		case "ajuda":
			ajudaBtn.src = "assets/ajuda1.png";
			break;
		}
	}
	function buttonListener2(ev) {

		switch(ev.currentTarget.id) {

		case "jogar":
			jogarBtn.src = "assets/jogar.png";
			break;
		case "opcoes":
			opcoesBtn.src = "assets/opcoes.png";
			break;
		case "creditos":
			creditosBtn.src = "assets/creditos.png";
			break;
		case "sair":
			sairBtn.src = "assets/sair.png";
			break;
		case "ajuda":
			ajudaBtn.src = "assets/ajuda.png";
			break;
		}
	}
	jogarBtn.addEventListener("mouseover", buttonListener1); 
	jogarBtn.addEventListener("mouseout", buttonListener2);
	opcoesBtn.addEventListener("mouseover", buttonListener1); 
	opcoesBtn.addEventListener("mouseout", buttonListener2);
	creditosBtn.addEventListener("mouseover", buttonListener1);
	creditosBtn.addEventListener("mouseout", buttonListener2);
	sairBtn.addEventListener("mouseover", buttonListener1);
	sairBtn.addEventListener("mouseout", buttonListener2);
	ajudaBtn.addEventListener("mouseover", buttonListener1);
	ajudaBtn.addEventListener("mouseout", buttonListener2);


	var msg = function(ev) {
		messageHandler(ev, jogarBtn, "2");
		messageHandler(ev, opcoesBtn, "4");
		messageHandler(ev, creditosBtn, "5");
		messageHandler(ev, sairBtn, "6");
		messageHandler(ev, ajudaBtn, "7");
	}
	window.addEventListener("message", msg);
}

function messageHandler(ev, Btn, option) {
	var main = ev.source;

	var changePage = function(ev) {
		main.postMessage(option, '*');
	}
	Btn.addEventListener("click", changePage);
}		

