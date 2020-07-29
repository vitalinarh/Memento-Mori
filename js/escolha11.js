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
		letraALetra(fala, "Desconhecido: ", "Ai Benjamin...", 120);
	}, 6000);
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Onde é que já se viu uma criança tão revoltada com o mundo?", 120);
	}, 8300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "A verdade é que tinhas motivos para tanta frustração.", 120);
	}, 16000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Sempre quiseste fazer os teus pais orgulhosos. E eles ignoravam as tuas tentativas,", 120);
	}, 24000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "ofuscados pelo mérito do teu irmão.", 120);
	}, 34300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Mas houve um dia em especial que ficou marcado para sempre...", 120);
	}, 39600);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Era o teu dia de anos e o teu primeiro grande jogo de futebol no clube.", 120);
	}, 48000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Estavas tão orgulhoso! Mas eles nem ligaram.", 120);
	}, 57000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Nos primeiros minutos, o teu irmão avança em grande pelo campo e marca logo um golo.", 120);
	}, 65000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Naquele momento, o teu coração partiu.", 120);
	}, 78000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Aposto que te lembras desse dia como se fosse ontem. Recordas-te do que fizeste a seguir?", 120);
	}, 83000);

	setTimeout(function(){
		fala.innerHTML = "";
		document.getElementById("opcao1").style.visibility = "visible";
		document.getElementById("opcao2").style.visibility = "visible";
	}, 94000);

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
			parent.postMessage("12/10", '*');
		}
		if(opcao2.style.color == "black") {
			parent.postMessage("12/0", '*');
		}		
    }
}