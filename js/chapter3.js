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
		parent.parent.postMessage("21", '*');	
	}
	
	skip.addEventListener("mouseover", skipListener1);
	skip.addEventListener("mouseout", skipListener2);
	skip.addEventListener("click", skipListener3);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Encontraste o teu dom na arte da guerra.", 120);
	}, 15300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Amizades foram feitas.", 120);
	}, 21600);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Uma em particular que parecia ser para o resto da tua vida.", 120);
	}, 25300);	

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Ambrósio, cabo-adjunto.", 90);
	}, 33300);	

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Ele esteve lá desde o primeiro dia que chegaste ao campo militar.", 120);
	}, 38300);	

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Foi com ele que aprendeste a segurar uma espingarda.", 120);
	}, 47300);
	
	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "E com ele superaste os mais árduos treinos.", 120);
	}, 54300);	

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Foram os anos mais fatigantes da tua vida.", 120);
	}, 61300);	


	setTimeout(function(){
		fala.innerHTML = "";
	    document.getElementById("box").style.visibility = "hidden";
		document.getElementById("luz").style.visibility = "hidden";
		document.getElementById("fundoTexto").src = "assets/preto.png";
	   	parent.parent.postMessage("pauseMusica", '*');
	}, 69300);

	setTimeout(function(){
		fala.style.left = "190px";
		fala.style.fontSize = "50px";
		letraALetra(fala, "", "E escolhas tinham que ser feitas...", 80);
	}, 70300);

	setTimeout(function(){
	   fala.innerHTML = "";
	   parent.parent.postMessage("21", '*');
	}, 74300);
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