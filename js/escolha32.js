(function() {
	window.addEventListener("load", main);
}());

function main() {

	document.getElementById("opcao1").style.color = "black";
	document.getElementById("opcao2").style.color = "white";

	var fala = document.getElementById("fala");

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Durante o teu tempo no campo militar deste o teu máximo.", 120);
	}, 6000);
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Mas amizades eram poucas e vontade de as fazer também.", 120);
	}, 15000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "As tuas experiências passadas tornaram-te numa pessoa calculada e por vezes fria.", 120);
	}, 24000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Não vias mais futuro dali para a frente. Pensavas que esse seria o teu fim.", 120);
	}, 35000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Foram anos muito difíceis e então: ", 120);
	}, 45000);

	setTimeout(function(){
		fala.innerHTML = "";
		document.getElementById("opcao1").style.visibility = "visible";
		document.getElementById("opcao2").style.visibility = "visible";
	}, 50000);

	window.focus();
	window.addEventListener("keydown", teclaHandler, true);
}

//Fazer aparecer um determinado texto no ecrã, letra a letra.
function letraALetra(elem, personagem, texto, velocidade) {
    elem.innerHTML += personagem;
    
    var i = 0;
    var interval = setInterval(function(){
        elem.innerHTML += texto.charAt(i);
        i++;
        if(i > texto.length){
            clearInterval(interval);
        }
    }, velocidade);
}

function teclaHandler(ev) {
	
	//Cancelar a ação default, se for preciso.
	ev.preventDefault();

	var opcao1 = document.getElementById("opcao1");
	var opcao2 = document.getElementById("opcao2");	

	//A tecla 38 no teclado é o up.
	if(ev.keyCode === 38) {
		if(opcao1.style.color == "black") {
			opcao2.style.color = "black";
			opcao1.style.color = "white";
		}
		else if(opcao2.style.color == "black") {
			opcao1.style.color = "black";
			opcao2.style.color = "white";
		}	
	}

	//A tecla 40 no teclado é o down.
	if(ev.keyCode === 40) {
		if(opcao1.style.color == "black") {
			opcao2.style.color = "black";
			opcao1.style.color = "white";
		}
		else if(opcao2.style.color == "black") {
			opcao1.style.color = "black";
			opcao2.style.color = "white";
		}	
	}		
	
	//A tecla 13 no teclado é o enter.
	if(ev.keyCode === 13) {
		if(opcao1.style.color == "black") {
			parent.postMessage("27/5", '*');
		}
		if(opcao2.style.color == "black") {
			parent.postMessage("27/0", '*');
		}		
    }
}