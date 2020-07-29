"use strict";

(function() {
	window.addEventListener("load", main);
}());

function main() {

	var voltarBtn = document.getElementById("voltar");
	voltarBtn.addEventListener("click", back);

	function buttonListener1(ev) {
		voltarBtn.src = "assets/voltar1.png";
	}
	function buttonListener2(ev) {
		voltarBtn.src = "assets/voltar.png";
	}
	voltarBtn.addEventListener("mouseover", buttonListener1);
	voltarBtn.addEventListener("mouseout", buttonListener2);
}

function back(ev) {
	//Enviar mensagem para a main para se voltar ao menu principal.
	parent.parent.postMessage("7", '*');
}
