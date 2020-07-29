"use strict";

(function() {
	window.addEventListener("load", main);
}());

function main() {

	window.focus(); //Possibilita que o enter seja reconhecido sem ter de se clicar na janela primeiro.
	window.addEventListener("keydown", enterHandler, true);

	var img1 = document.getElementById('pressione');
	var img2 = document.getElementById('pressione1');

	//Fazer 'blink' no texto com a instrução para pressionar.
	var interval = window.setInterval(function() {
	    if(img1.style.visibility == 'hidden') {
	        img1.style.visibility = 'visible';
	        img2.style.visibility = 'hidden';
	    }
	    else {
	        img1.style.visibility = 'hidden';
	        img2.style.visibility = 'visible';
	    }
	}, 700);
}

function enterHandler(ev) {

	ev.preventDefault();
	
	//A tecla 13 no teclado é o enter.
	if(ev.keyCode === 13) {
	    //Cancelar a ação default, se for preciso.
		parent.postMessage("1", '*');
    }
}