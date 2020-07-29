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
		parent.parent.postMessage("10", '*');	
	}
	
	skip.addEventListener("mouseover", skipListener1);
	skip.addEventListener("mouseout", skipListener2);
	skip.addEventListener("click", skipListener3);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Comecemos pelo início.", 120);
	}, 14300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Tu sempre foste uma criança problemática.", 120);
	}, 17300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Nunca te conseguiste dar bem com a tua família, pois não?", 120);
	}, 23300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Especialmente com o teu irmão.", 120);
	}, 31300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Sempre tiveste problemas com ele.", 120);
	}, 37300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Ele sempre foi o filho perfeito.", 120);
	}, 42300);

	//Fazer aparecer os objetos relacionados com o irmão.
	setTimeout(function(){
		document.getElementById("bola").style.visibility = "visible";
	}, 46600);
	setTimeout(function(){
		document.getElementById("musica").style.visibility = "visible";
	}, 47200);
	setTimeout(function(){
		document.getElementById("livro").style.visibility = "visible";
	}, 47800);
	setTimeout(function(){
		document.getElementById("amor").style.visibility = "visible";
	}, 48400);

	//Fazer desaparecer os ojetos relacionados com o irmão.
	setTimeout(function(){
		document.getElementById("bola").style.visibility = "hidden";
		document.getElementById("musica").style.visibility = "hidden";
		document.getElementById("livro").style.visibility = "hidden";
		document.getElementById("amor").style.visibility = "hidden";
	}, 49600);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "E tu...", 120);
	}, 51600);

	setTimeout(function(){
		fala.innerHTML = "";
	    document.getElementById("box").style.visibility = "hidden";
		document.getElementById("luz").style.visibility = "hidden";
		document.getElementById("fundoTexto").src = "assets/preto.png";
	   	parent.parent.postMessage("pauseMusica", '*');
	}, 54600);

	setTimeout(function(){
		fala.style.left = "280px";
		fala.style.fontSize = "50px";
		letraALetra(fala, "", "Bem, nem por isso.", 80);
	}, 56300);

	setTimeout(function(){
	   fala.innerHTML = "";
	   parent.parent.postMessage("10", '*');
	}, 58300);
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