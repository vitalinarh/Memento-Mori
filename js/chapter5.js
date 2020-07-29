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
		parent.parent.postMessage("33", '*');	
	}
	
	skip.addEventListener("mouseover", skipListener1);
	skip.addEventListener("mouseout", skipListener2);
	skip.addEventListener("click", skipListener3);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "A guerra finalmente terminou.", 120);
	}, 14300);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Passaram anos e a tua vida era miserável.", 120);
	}, 19600);

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Sem casa, sem emprego, sem família.", 120);
	}, 27300);	

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Atormentado pelos horrores da guerra.", 90);
	}, 33300);	

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "O teu único consolo era a bebida.", 120);
	}, 40300);	

	setTimeout(function(){
		//Limpar caixa de texto para se escrever a próxima fala.
		fala.innerHTML = "";
		letraALetra(fala, "Desconhecido: ", "Por milagre continuavas vivo.", 120);
	}, 47300);	

	setTimeout(function(){
		fala.innerHTML = "";
	    document.getElementById("box").style.visibility = "hidden";
		document.getElementById("luz").style.visibility = "hidden";
		document.getElementById("fundoTexto").src = "assets/preto.png";
	}, 53600);

	setTimeout(function(){
		fala.style.left = "300px";
		fala.style.fontSize = "50px";
		letraALetra(fala, "", "Até ao dia em que...", 80);
	}, 55600);

	setTimeout(function(){
	   fala.innerHTML = "";
	   parent.parent.postMessage("33", '*');
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