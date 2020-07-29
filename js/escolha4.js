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
		letraALetra(fala, "Desconhecido: ", "Infelizmente, já era tarde de mais quando o encontraste.", 120);
	}, 6000);
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Ambrósio foi atingido e estava deitado sob o seu próprio sangue.", 120);
	}, 15000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Um arrepio passou pelo teu corpo, dos pés à cabeça.", 120);
	}, 24000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Ficaste em estado de choque. Olhaste para o lado e avistaste ao longe um inimigo.", 120);
	}, 34000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Numa questão de segundos, tiveste de seguir os teus instintos e: ", 120);
	}, 47000);

	setTimeout(function(){
		fala.innerHTML = "";
		document.getElementById("opcao1").style.visibility = "visible";
		document.getElementById("opcao2").style.visibility = "visible";
		document.getElementById("opcao3").style.visibility = "visible";
	}, 56000);

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
	var opcao3 = document.getElementById("opcao3");

	//A tecla 38 no teclado é o up.
	if(ev.keyCode === 38) {
		if(opcao1.style.color == "black") {
			opcao3.style.color = "black";
			opcao1.style.color = "white";
		}
		else if(opcao2.style.color == "black") {
			opcao1.style.color = "black";
			opcao2.style.color = "white";
		}
		else if(opcao3.style.color == "black") {
			opcao2.style.color = "black";
			opcao3.style.color = "white";
		}		
	}

	//A tecla 40 no teclado é o down.
	if(ev.keyCode === 40) {
		if(opcao1.style.color == "black") {
			opcao2.style.color = "black";
			opcao1.style.color = "white";
		}
		else if(opcao2.style.color == "black") {
			opcao3.style.color = "black";
			opcao2.style.color = "white";
		}
		else if(opcao3.style.color == "black") {
			opcao1.style.color = "black";
			opcao3.style.color = "white";
		}		
	}		
	
	//A tecla 13 no teclado é o enter.
	if(ev.keyCode === 13) {
		if(opcao1.style.color == "black") {
			parent.postMessage("32/10", '*');
		}
		if(opcao2.style.color == "black") {
			parent.postMessage("32/5", '*');
		}	
		if(opcao3.style.color == "black") {
			parent.postMessage("32/0", '*');
		}		
    }
}