(function() {
	window.addEventListener("load", main);
}());

var maxVolume = 1;

function main() {

	var volumeMusica = 1;
	var volumeSom = 1;
	var ligadoMusica = 1;
	var ligadoSom = 1;

	var som1Btn = document.getElementById("som1");
	var musica1Btn = document.getElementById("musica1");
	var menosBtn = document.getElementById("menos");
	var menos1Btn = document.getElementById("menos1");
	var maisBtn = document.getElementById("mais");
	var mais1Btn = document.getElementById("mais1");
	var voltarBtn = document.getElementById("voltar");

	voltarBtn.addEventListener("click", back);

	//Controlar o volume da música do jogo.
    var musicUp = function(ev) {
        musica = up(ev, volumeMusica, maisBtn, menosBtn, "musica", ligadoMusica);
        volumeMusica = musica[0];
        ligadoMusica = musica[1];
        console.log(volumeMusica)
    }
    maisBtn.addEventListener("click", musicUp);
    
    var musicDown = function(ev) {
        musica = down(ev, volumeMusica, maisBtn, menosBtn, "musica", ligadoMusica);
        volumeMusica = musica[0];
        ligadoMusica = musica[1];
        console.log(volumeMusica)
    }
    menosBtn.addEventListener("click", musicDown);


    //Controlar o volume dos sons do jogo.
    var soundUp = function(ev) {
        som = up(ev, volumeSom, mais1Btn, menos1Btn, "som", ligadoSom);
        volumeSom = som[0];
        ligadoSom = som[1];
        console.log(volumeSom)
    }
    mais1Btn.addEventListener("click", soundUp);

    var soundDown = function(ev) {
        som = down(ev, volumeSom, mais1Btn, menos1Btn, "som", ligadoSom);
        volumeSom = som[0];
        ligadoSom = som[1];
        console.log(volumeSom)
    }
    menos1Btn.addEventListener("click", soundDown);

    //Ligar/Desligar música e/ou som.
    var musicaOff = function(ev) {
    	ligadoMusica = mute(ev, ligadoMusica, "musica");
    	volumeMusica = 0;
    	menosBtn.style.opacity = 0.2;
    	menosBtn.disabled = true;
    	maisBtn.style.opacity = 1;
    	maisBtn.disabled = false;
    }
    musica1Btn.addEventListener("click", musicaOff);

    var somOff = function(ev) {
    	ligadoSom = mute(ev, ligadoSom, "som");
    	volumeSom = 0;
    	menos1Btn.style.opacity = 0.2;
    	menos1Btn.disabled = true;
    	mais1Btn.style.opacity = 1;
    	mais1Btn.disabled = false;
    }
    som1Btn.addEventListener("click", somOff);

	function buttonListener1(ev) {

		var button = document.getElementById(ev.currentTarget.id);
		button.style.opacity = 0.7;
		button.disabled = false;
	}
	function buttonListener2(ev) {

		var button = document.getElementById(ev.currentTarget.id);
		button.style.opacity = 1;
		button.disabled = false;
	}
	som1Btn.addEventListener("mouseover", buttonListener1);
	som1Btn.addEventListener("mouseout", buttonListener2);
	musica1Btn.addEventListener("mouseover", buttonListener1);
	musica1Btn.addEventListener("mouseout", buttonListener2);
	menosBtn.addEventListener("mouseover", buttonListener1);
	menosBtn.addEventListener("mouseout", buttonListener2);
	menos1Btn.addEventListener("mouseover", buttonListener1);
	menos1Btn.addEventListener("mouseout", buttonListener2);
	maisBtn.addEventListener("mouseover", buttonListener1);
	maisBtn.addEventListener("mouseout", buttonListener2);
	mais1Btn.addEventListener("mouseover", buttonListener1);
	mais1Btn.addEventListener("mouseout", buttonListener2);
	voltarBtn.addEventListener("mouseover", buttonListener1);
	voltarBtn.addEventListener("mouseout", buttonListener2);
}

function back(ev) {

	//Enviar mensagem para a main para se voltar ao menu principal.
	parent.parent.postMessage("1", '*');
}
                                                               
function up(ev, volume, plus, less, tipo, ligado) {

	if(volume+0.1<=maxVolume) {

	    if(tipo == "musica")
	   		parent.parent.postMessage("musicUp", "*");
	   	volume +=0.1;

   		if(ligado == 0 && tipo == "musica") {
   			document.getElementById("musica1").style.opacity = 1;
			document.getElementById("musica1").disabled = false;   			
   			ligado = 1;
   		}
   		if(ligado == 0 && tipo == "som") {
   			document.getElementById("som1").style.opacity = 1;
			document.getElementById("som1").disabled = false;   	   			
   			ligado = 1;
   		}	

        if(less.style.opacity == 0.2)
        	less.style.opacity = 1;
        	less.disabled = false;
	}
	if(volume+0.1>=maxVolume) {
	    plus.style.opacity = 0.2;
	    plus.disabled = true
	}
    return [volume, ligado];
}

function down(ev, volume, plus, less, tipo, ligado) {

	if(volume-0.1>=0) {

        if(tipo == "musica")
       		parent.parent.postMessage("musicDown", "*");
       	volume -=0.1;

        if(plus.style.opacity == 0.2)
        	plus.style.opacity = 1;
        	plus.disabled = false;
	}
	if(volume-0.1<=0) {
	   	less.style.opacity = 0.2;
	   	less.disabled = true;

	   	if(ligado == 1 && tipo == "musica") {
	   		document.getElementById("musica1").style.opacity = 0.2;
			document.getElementById("musica1").disabled = true;   		
	   		ligado = 0;
       	}
       	if(ligado == 1 && tipo == "som") {
       		document.getElementById("som1").style.opacity = 0.2;
       		document.getElementById("som1").disabled = true;	   		
	   		ligado = 0;
	   	}
	}
    return [volume, ligado];
}

function mute(ev, ligado, tipo) {

	if(tipo == "musica") {
		if(ligado == 1) {
			ligado = 0;
			document.getElementById("musica1").style.opacity = 0.2;
			document.getElementById("musica1").disabled = true;
			parent.parent.postMessage("muteMusica", '*');
		}
	}
	else if(tipo == "som") {
		if(ligado == 1) {
			ligado = 0;
			document.getElementById("som1").style.opacity = 0.2;
			document.getElementById("som1").disabled = true;			
			parent.parent.postMessage("muteSom", '*');
		}
	}
	return ligado;
}