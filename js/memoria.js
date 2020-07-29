const cartas = document.querySelectorAll('.carta');

let virouCarta = false;
let bloqueia = false;
let primeiraCarta, segundaCarta,par,rand;
let movimentos = 0;
let certos = 0;
let contador = document.querySelector(".movimentos");

shuffle();

var homeBtn = document.getElementById("home");
var desistirBtn = document.getElementById("desistir");

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

	console.log("vjfkdj");

	switch(ev.currentTarget.id) {

	case "home":
		parent.parent.postMessage("1/over", '*');
		break;
	case "desistir":
		parent.parent.postMessage("17", '*');
		break;
	}
}
homeBtn.addEventListener("mouseover", buttonListener1); 
homeBtn.addEventListener("mouseout", buttonListener2);
homeBtn.addEventListener("click", buttonListener3);
desistirBtn.addEventListener("mouseover", buttonListener1); 
desistirBtn.addEventListener("mouseout", buttonListener2);
desistirBtn.addEventListener("click", buttonListener3);

for(let i=0; i<cartas.length;i++) {
	cartas[i].addEventListener('click', virarCartas)
}

function virarCartas() {

	if(bloqueia) {
		return;
  	} 
	if(this === primeiraCarta) {
		return;
	} 
	this.classList.add('virar');

	if(!virouCarta) {
		virouCarta = true;
		primeiraCarta = this;
		return;
	}
	segundaCarta = this;
	confirmaPar();
}

function confirmaPar() {
  
	if(primeiraCarta.dataset.framework === segundaCarta.dataset.framework) {
		par=true;
  	}
  	else {
		par=false;
  	}
	movimentos++;
	contador.innerHTML = movimentos;

	if(par) {
		bloqueiaCartas();
		certos++;

		if(certos == 6) {
			if(movimentos <= 12) 
				msg = "16/10";
			else 
				msg = "16/5";
			parent.parent.postMessage(msg, '*');
		}
	}
	else {
		retomarCartas();
	}
}

function bloqueiaCartas() {
	primeiraCarta.removeEventListener('click', virarCartas);
	segundaCarta.removeEventListener('click', virarCartas);

	reset();
}

function retomarCartas() {
	bloqueia = true;

	setTimeout(function(){primeiraCarta.classList.remove('virar'); segundaCarta.classList.remove('virar'); reset();}, 1500);
}

function reset() {
	virouCarta=false;
	bloqueia=false;
	primeiraCarta=null;
	segundaCarta=null;
}

function shuffle(){
	for(let i=0; i<cartas.length;i++){
		rand = Math.floor(Math.random() * 12);
		cartas[i].style.order = rand;
  	}
}