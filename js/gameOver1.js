(function(){
	window.addEventListener("load", main);
}());

function main() {

	var homeBtn = document.getElementById("home");
	var replayBtn = document.getElementById("replay");

	function buttonListener1(ev) {

		switch(ev.currentTarget.id) {

		case "home":
			homeBtn.src = "assets/home3.png";
			break;
		case "replay":
			replayBtn.src = "assets/replay1.png";
			break;
		}
	}
	function buttonListener2(ev) {

		switch(ev.currentTarget.id) {

		case "home":
			homeBtn.src = "assets/home2.png";
			break;
		case "replay":
			replayBtn.src = "assets/replay.png";
			break;
		}
	}
	function buttonListener3(ev) {

		switch(ev.currentTarget.id) {

		case "home":
			parent.parent.postMessage("1/over", '*');
			break;
		case "replay":
			parent.parent.postMessage("11", '*');
			break;
		}
	}
	homeBtn.addEventListener("mouseover", buttonListener1); 
	homeBtn.addEventListener("mouseout", buttonListener2);
	homeBtn.addEventListener("click", buttonListener3);
	replayBtn.addEventListener("mouseover", buttonListener1); 
	replayBtn.addEventListener("mouseout", buttonListener2);
	replayBtn.addEventListener("click", buttonListener3);
}