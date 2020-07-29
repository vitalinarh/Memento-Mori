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
		parent.parent.postMessage("28", '*');	
	}
	
	skip.addEventListener("mouseover", skipListener1);
	skip.addEventListener("mouseout", skipListener2);
	skip.addEventListener("click", skipListener3);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Foste chamado para defender o teu país.", 120);
	}, 14300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Tu nem pensaste duas vezes, vestiste o teu uniforme,", 120);
	}, 20000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "pegaste na espingarda e seguiste para o campo de batalha.", 120);
	}, 28000);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Ambrósio estava sempre ao teu lado, a contar-te histórias sobre o seu passado.", 90);
	}, 39300);	

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Foram separados a meio do combate.", 120);
	}, 49300);	

	setTimeout(function(){
		fala.innerHTML = "";
	    document.getElementById("box").style.visibility = "hidden";
		document.getElementById("luz").style.visibility = "hidden";
		document.getElementById("fundoTexto").src = "assets/preto.png";
	   	parent.parent.postMessage("pauseMusica", '*');
	}, 54600);

	setTimeout(function(){
		fala.style.left = "300px";
		fala.style.fontSize = "50px";
		letraALetra(fala, "", "E tu nem notaste...", 80);
	}, 55600);

	setTimeout(function(){
	   fala.innerHTML = "";
	   parent.parent.postMessage("28", '*');
	}, 57600);
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