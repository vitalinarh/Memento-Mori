"use strict";

(function() {
	window.addEventListener("load", main);
}());

function main() {

	var voltarBtn = document.getElementById("voltar");

	function buttonListener1(ev) {

		switch(ev.currentTarget.id) {

		case "voltar":
			voltarBtn.src = "assets/voltar1.png";
			break;

		}
	}

	function buttonListener2(ev) {

		switch(ev.currentTarget.id) {

		case "voltar":
			voltarBtn.src = "assets/voltar.png";
			break;
			
		}
	}

	voltarBtn.addEventListener("mouseover", buttonListener1); 
	voltarBtn.addEventListener("mouseout", buttonListener2);

	var msg = function (ev) {

		messageHandler(ev, voltarBtn, "1");
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
