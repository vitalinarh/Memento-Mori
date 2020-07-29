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
		parent.parent.postMessage("11", '*');	
	}
	
	skip.addEventListener("mouseover", skipListener1);
	skip.addEventListener("mouseout", skipListener2);
	skip.addEventListener("click", skipListener3);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Alguns anos se passaram...", 120);
	}, 14300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "A tua vida tinha melhorado um pouco desde então.", 120);
	}, 19600);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Arranjaste uma namorada.", 120);
	}, 27300);	

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Conseguiste até distanciar-te da relação tóxica que tinhas com a tua família.", 90);
	}, 33300);	

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "As coisas até pareciam estar a correr bem...", 120);
	}, 40300);	

	setTimeout(function(){
		fala.innerHTML = "";
	    document.getElementById("box").style.visibility = "hidden";
		document.getElementById("luz").style.visibility = "hidden";
		document.getElementById("fundoTexto").src = "assets/preto.png";
	   	parent.parent.postMessage("pauseMusica", '*');
	}, 53600);

	setTimeout(function(){
		fala.style.left = "200px";
		fala.style.fontSize = "50px";
		letraALetra(fala, "", "Até ao dia do recrutamento.", 80);
	}, 55600);

	setTimeout(function(){
	   fala.innerHTML = "";
	   parent.parent.postMessage("11", '*');
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