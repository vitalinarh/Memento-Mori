(function(){
	window.addEventListener("load", main);
}());

function main() {

	//Iniciar o número de movimentos a -9 pois o shuffleTiles() já faz 9 movimentos.
	movimentos = -9;

	var homeBtn = document.getElementById("home");
	var desistirBtn = document.getElementById("desistir");

	//Colocar peças de uma forma aleatória sempre que se abrir o jogo.
	shuffleTiles();

	//As células td não são clickable portanto lidou-se com os clicks no ficheiro html, diretamente nas células.

	function buttonListener1(ev) {

		switch(ev.currentTarget.id) {

		case "home":
			homeBtn.src = "assets/home1.png";
			break;
		case "desistir":
			desistirBtn.src = "assets/desistir1.png";
			break;
		}
	}
	function buttonListener2(ev) {

		switch(ev.currentTarget.id) {

		case "home":
			homeBtn.src = "assets/home.png";
			break;
		case "desistir":
			desistirBtn.src = "assets/desistir.png";
			break;
		}
	}
	function buttonListener3(ev) {

		switch(ev.currentTarget.id) {

		case "home":
			parent.parent.postMessage("1/over", '*');
			break;
		case "desistir":
			parent.parent.postMessage("20", '*');
			break;
		}
	}
	homeBtn.addEventListener("mouseover", buttonListener1); 
	homeBtn.addEventListener("mouseout", buttonListener2);
	homeBtn.addEventListener("click", buttonListener3);
	desistirBtn.addEventListener("mouseover", buttonListener1); 
	desistirBtn.addEventListener("mouseout", buttonListener2);
	desistirBtn.addEventListener("click", buttonListener3);
}

function swapTiles(tile1, tile2) {

	//Atualizar o número de movimentos feitos pelo jogador.
	movimentos+=1;
	document.getElementById("movimentos").innerHTML = "Movimentos: " + movimentos;

	console.log(tile1);
	console.log(tile2);
	var temp = document.getElementById(tile1).className;
	var temp2 = document.getElementById(tile1).src;
	
	document.getElementById(tile1).className = document.getElementById(tile2).className;
	document.getElementById(tile1).src = document.getElementById(tile2).src;
	document.getElementById(tile2).className = temp;
	document.getElementById(tile2).src = temp2;

	var cell11 = document.getElementById("tile11");
	var cell12 = document.getElementById("tile12");
	var cell13 = document.getElementById("tile13");
	var cell21 = document.getElementById("tile21");
	var cell22 = document.getElementById("tile22");
	var cell23 = document.getElementById("tile23");
	var cell31 = document.getElementById("tile31");
	var cell32 = document.getElementById("tile32");
	var cell33 = document.getElementById("tile33");

	//Verificar se todas as peças estão nas posições corretas. Se sim, colocar a peça em falta e declarar a vitória.
	if(cell11.className == "tile1" && cell12.className == "tile2" && cell13.className == "tile3" && cell21.className == "tile4" && cell22.className == "tile5" && cell23.className == "tile6" && cell31.className == "tile7" && cell32.className == "tile8" && cell33.className == "tile9") {
		
		fadeIn(cell33, 20000000000);

		//Esperar 2000 ms que a peça final apareça e depois mandar uma mensagem à main.
		setTimeout(function(){
			var msg = "19/15";
			parent.parent.postMessage(msg, "*");
		}, 2000);
	}
}

function shuffleTiles() {

	/*Definir as variáveis fora dos ciclos torna o programa muito mais rápido*/
	var linha;
	var coluna;
	var linhaRandom;
	var colunaRandom;
	
	//Para cada peça do puzzle, encontrar outra random para se trocar com esta.
	for(linha=1;linha<=3;linha++) { 
		for(coluna=1;coluna<=3;coluna++) {
			linhaRandom = Math.floor(Math.random()*3) + 1; //Escolher uma linha random.
    		colunaRandom = Math.floor(Math.random()*3) + 1; //Escolher uma coluna random.
    		swapTiles("tile" + linha + coluna, "tile" + linhaRandom + colunaRandom); //Trocar as duas peças escolhidas.
    	} 
	}
	//Fazer aparecer as peças do puzzle, uma de cada vez.
	for(linha=1;linha<=3;linha++) { 
		for(coluna=1;coluna<=3;coluna++) {
			var peca = document.getElementById("tile" + linha + coluna);
			peca.style.visibility = "visible";
    	} 
	}
} 

function clickTiles(linha, coluna) {
  
	var peca = document.getElementById("tile" + linha + coluna);
	var tile = peca.className;
  
  	//Se a peça clicada não for a peça branca:
 	if(tile != "tile9") { 
  		
  		//Verificar se a peça branca está à direita da peça clicada. Se sim, mover a peça clicada para a direita.
        if(coluna<3) {
        	if(document.getElementById("tile" + linha + (coluna+1)).className == "tile9") {
           		swapTiles("tile" + linha + coluna, "tile" + linha + (coluna+1));
           	return;
         	}
       	}
       	//Verificar se a peça branca está à esquerda da peça clicada. Se sim, mover a peça clicada para a esquerda.
       	if(coluna>1) {
        	if(document.getElementById("tile" + linha + (coluna-1)).className == "tile9") {
           		swapTiles("tile" + linha + coluna, "tile" + linha + (coluna-1));
           	return;
        	}
       	}
        //Verificar se a peça branca está em cima da peça clicada. Se sim, mover a peça clicada para cima.
       	if(linha>1) {
        	if(document.getElementById("tile" + (linha-1) + coluna).className == "tile9") {
           		swapTiles("tile" + linha + coluna, "tile" + (linha-1) + coluna);
           	return;
         	}
       	}
       	//Verificar se a peça branca está em baixo da peça clicada. Se sim, mover a peça clicada para baixo.
       	if(linha<3) {
        	if(document.getElementById("tile" + (linha+1) + coluna).className == "tile9") {
           		swapTiles("tile" + linha + coluna, "tile" + (linha+1) + coluna);
           	return;
        	}
       	} 
  	}
}

function fadeIn(elem, duracao) {
	elem.src = "assets/puzzle/peca9.png";
    
    var step = 10 / duracao,
        opacidade = 0;
    
    function next() {
        if(opacidade >= 1) 
        	return; 
        elem.style.opacity = opacidade += step;
        setTimeout(next, 1000);
    }
    next();
}