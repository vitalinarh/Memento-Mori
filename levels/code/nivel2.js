"use strict";

(function(){
	window.addEventListener("load", main);
}());

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function main(){

	//-------------------------------Audio-----------------------------------------------------------------------

	var audio = document.getElementsByTagName("audio")[0];
	var audio2 = document.getElementsByTagName("audio")[1];
	//------------------------------------------------------------------------------------------------------------
	//-------------------------- Manage Loaded Images---------------------------------------------------------------------------------------------------------------------------------------
	
	var loaded = 0;
	var total = 4;
	var health = 3;

	//--------------------------- Manage frame count ----------------------------------------------------------------------------------------------------------------------------------------
	
	var frameNum = 0;
	var frameCycle = 10;
	var nFrame = 0;

	//--------------------------- Health of the Character ----------------------------------------------------------------------------------------------------------------------------------
	
	var health = 3;

	//---------------------------------------------------------------------------------------------------------------------------
	//--------------------------- Number of spikes/cards and array ------------------------------------------------------------------------
	
	var nSpikes = 11;
	var spikesArray = new Array(nSpikes);
	var nCards = 12;
	var grabbedCards = 0;
	var cartasArray = new Array(nCards);
	var ntrees = 10;
	var treesArray = new Array(ntrees);
	var girlfriend = new Array(1);

	//------------------------------ Set Time (seconds)------------------------------------------------------------------------------------------------------

	var time = 25;

	//-----------------------------------------------------------------------------------------------------------------------------

	var finishedLoading = false;

	//-------------------------- Load Images -------------------------------------------------------------------------------------------------------------------------------------------
	
	//-------------------------- Character -------------------------------------------------------------------------------------------------------------------------------------------

	var playerAnim = new Image();
	playerAnim.id = "playerAnim";
	playerAnim.addEventListener("load", loadHandler);
	playerAnim.src = "assets/jovem.png";

	//-------------------------- Backdrop  -------------------------------------------------------------------------------------------------------------------------------------------

	var layout = new Image();
	layout.id = "layout";
	layout.addEventListener("load", loadHandler);
	layout.src = "assets/GirlfriendBackground.png";

	//--------------------------  Layout -------------------------------------------------------------------------------------------------------------------------------------------
	
	var layoutHit = new Image();
	layoutHit.id = "layoutHit";
	layoutHit.addEventListener("load", loadHandler);
	layoutHit.src = "assets/testHitV1.png";

	//--------------------------  Spikes -------------------------------------------------------------------------------------------------------------------------------------------
	
	var spikes = new Image();
	spikes.id = "spike";
	spikes.addEventListener("load", loadHandler);
	spikes.src = "assets/spikes.png";

	//--------------------------  Cartas -------------------------------------------------------------------------------------------------------------------------------------------
	
	var carta = new Image();
	carta.id = "carta";
	carta.addEventListener("load", loadHandler);
	carta.src = "assets/carta.png";

	//----------------------------Namorada------------------------------------------------------------------------------------------------
	

	var girlfriendImage = new Image();
	girlfriendImage.id = "girlfriend";
	girlfriendImage.addEventListener("load", loadHandler);
	girlfriendImage.src = "assets/namorada.png";
	

	finishedLoading = true;

	//----------------------Only visible canvas, equivalent to a camera or the game window---------------------------------------------------------------------------------------------------

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	//-------------Scaled up to 4x----------------------------------------------------------------------
	
	ctx.imageSmoothingEnabled = false;
	ctx.scale(3, 3);

	//For tileset (terrain and static boundaries)
	var layoutCanvas = document.getElementById("layoutCanvas");
	var layoutCtx = layoutCanvas.getContext("2d");

	//For static collision areas (level and objects)
	var layoutHitCanvas = document.getElementById("layoutHitCanvas");
	var layoutHitCtx = layoutHitCanvas.getContext("2d");

	//For entities and objects
	var entityCanvas = document.getElementById("entityCanvas");
	var entityCtx = entityCanvas.getContext("2d");

	//For dynamic collision boxes (entities)
	var entityHitCanvas = document.getElementById("entityHitCanvas");
	var entityHitCtx = entityHitCanvas.getContext("2d");

	//---------------------------- Text Style------------------------------------------------------------------------------------------------

	ctx.fillStyle = "black";
	ctx.font = "8px Impact";	
	ctx.textBaseline = "bottom"; 
	ctx.textAlign = "center"; 

	//------------------------------------------------------------------------------------------------------------------

	function loadHandler(ev){

		var img = ev.target;

		if(img.id == "layout"){

			//-------------------------------Size of level layout given--------------------------------------------------------------------------------------------------------------------
			
			var layoutWidth = layout.naturalWidth;
			var layoutHeight = layout.naturalHeight;

			//-------------------------------Resize invisible canvasses according to level size---------------------------------------------------------------------------------------
			
			layoutCanvas.width = entityCanvas.width = layoutWidth;
			layoutCanvas.height = entityCanvas.height = layoutHeight;
			
			//-------------------------------Draw level layout (only needed once)-------------------------------------------------------------------------------------------------------
			
			layoutCtx.drawImage(layout, 0, 0, layoutWidth, layoutHeight);

			loaded++;
		}

		if(img.id == "layoutHit"){

			//-----------------------------Size of collision layout given----------------------------------------------------------------------------------------------------------------
			
			
			var layoutHitWidth = layoutHit.naturalWidth;
			var layoutHitHeight = layoutHit.naturalHeight;

			loaded++;
		}

		if(img.id == "playerAnim"){

			var playerSheet = new AnimSheet(playerAnim, 50, 97, 3);
			var playerSheetloaded = true;
			loaded++;

		}

		//------------------------- Spikes ---------------------------------------------------------------------------------------------------------------------

		if(img.id == "spike"){

			for (var i = 0; i < nSpikes; i++) {

				if(i == 0){

					var x = (i + 2) * 100;
					var y = 230;
				}

				else{

					var x = spikesArray[i - 1].x;
					var space = Math.round((Math.random() * 110) + 100); 
					var x = x + space;
					var y = 230;

				}

				spikesArray[i] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);
				var spikesReady = true;
			}

			loaded++;
		}

		if(img.id == "girlfriend"){

			var x = 2300;
			var y = 160;

			girlfriend[0] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);
				
		}

		//------------------------- Cartas ---------------------------------------------------------------------------------------------------------------------

		if(img.id == "carta"){

			for (var i = 0; i < nCards; i++) {

				if(i == 0){

					var x = (i + 2) * 100;
					var y = 120;
				}

				else{

					var x = cartasArray[i - 1].x;
					var space = Math.round((Math.random() * 100) + 90); 
					var x = x + space;
					var y = Math.floor((Math.random() * 130) + 110);;

				}

				cartasArray[i] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);
				var cartasReady = true;
			}

			loaded++;
		}


		//-------------------------When all  components all loaded---------------------------------------------------------------------------------------------------------------------

		if(finishedLoading && playerSheetloaded) {	

			var player = new Player(0, 160, 100, 40, 2, playerSheet);

			//-----------------------Declare camera dimensions and starting point-------------------------------------------------------------------------------------------------------
			
			var cam = new Viewport(0, 0, 1000, 1000);

			//-----------------------Key listeners for movement of the character--------------------------------------------------------------------------------------------------------
			
			window.addEventListener("keydown", function(ev){ 
				player.keys[ev.keyCode] = true; 
			});

			window.addEventListener("keyup", function(ev){
				player.keys[ev.keyCode] = false;
			});

			
			//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

			//----------------------Start game loop-------------------------------------------------------------------------------------------------------------------------------------------
			//Start counting time
			var start = new Date().getTime();
			gameLoop(ctx, cam, player, spikesArray, girlfriend, start);
		}
	}

	//--------------------------------------------------------------------------------------------------------

	function gameLoop(ctx, cam, player, spikesArray, girlfriend, start) {	

		var t = function(time){

			gameLoop(ctx, cam, player, spikesArray, girlfriend, start);
		}

		var reqID = window.requestAnimationFrame(t);

		//----------------------Frame cicle resets every x number of frames (animation timer)-----------------------------------------------------------------------------------------

		frameNum += 1;

		if(frameNum % frameCycle == 0){
			frameNum = 0;
			player.updateAnim();
		}

		//---------------------------------Elapsed time -----------------------------------------------------------------------------------------------------------------------------------------------------
		
		var elapsed = new Date().getTime() - start;

		//----------------------Draw layers onto viewport canvas with render--------------------------------------------------------------------------------------------------------------
		
		render(ctx, cam, player, spikesArray, girlfriend, elapsed);
	}

	//------------------------------------------------------------------------------------------------------

	function render(ctx, cam, player, spikesArray, girlfriend, dt) {

		var cw = ctx.canvas.width;
		var ch = ctx.canvas.height;

		//Movement, attack, block;
		handleAction(ctx, cam, player);

		entityCtx.clearRect(cam.x, cam.y, cam.width, cam.height);
		entityHitCtx.clearRect(cam.x, cam.y, cam.width, cam.height);

		//------------------------ Draw the spikes --------------------------------------------------------------------------------------------------------------------------------------
		
		for (var i = nSpikes - 1; i >= 0; i--) {

			if (spikesArray[i].toDraw)

				spikesArray[i].draw(entityCtx);

			
			if(spikesArray[i].toDraw == false)

				spikesArray[i].clear(entityCtx);
		
		}

		//------------------------ Draw the cartas --------------------------------------------------------------------------------------------------------------------------------------
		//clear cards

		if((time - Math.round((dt)/1000)) < 0){
			var drawCards = false;
		}
		else
			var drawCards = true;

		for (var i = nCards - 1; i >= 0; i--) {

			if(cartasArray[i].toDraw){

				if(cartasArray[i].direction == 0){

					cartasArray[i].y -= 1;

					if(cartasArray[i].y < 90)

						cartasArray[i].direction = 1;
				}

				if(cartasArray[i].direction == 1){

					cartasArray[i].y += 1;

					if(cartasArray[i].y > 150)

						cartasArray[i].direction = 0;
				}

				if(drawCards)
					cartasArray[i].draw(entityCtx);
				else
					cartasArray[i].clear(entityCtx);

			}

			if(cartasArray[i].toDraw == false || drawCards == false)

				cartasArray[i].clear(entityCtx);
		
		}

		//---------------------- Check for the colisions with the spikes ------------------------------------------------------------------------------------------------------------------
		
		for (var i = 0; i < spikesArray.length; i++) {

			if (spikesArray[i].toDraw){

				var  verifica = spikesArray[i].intersecao(player);

				if(verifica == 1){

					player.nHits += 1;
				}
			}

			//------------------------------ Accounting the hits on the player --------------------------------------------------------------------------------------------------------------------------
			
			if(player.nHits == 5 && player.health >= 0) {

				spikesArray[i].clear(entityCtx);
				player.health -= 1;

				//---- Add audio ------------------------
				audio.play();

				var hearth = document.getElementById("heart" + (player.health + 1));
				hearth.style.visibility = "hidden";
				player.nHits = 0;

				if(player.health == 0)
					parent.parent.postMessage("13", '*');
			}
		}

		//---------------------- Check for the colisions with the spikes ------------------------------------------------------------------------------------------------------------------
		
		for (var i = 0; i < cartasArray.length; i++) {

			if (cartasArray[i].toDraw && drawCards){

				var  verifica = cartasArray[i].intersecao(player);

				if(verifica == 1){

					player.nHits += 1;
				}
			}

			//------------------------------ Accounting the hits on the player --------------------------------------------------------------------------------------------------------------------------
			 
			if(player.nHits == 5) {

				cartasArray[i].clear(entityCtx);
				cartasArray[i].toDraw = false;
				audio2.play();
				player.nHits = 0;
				grabbedCards += 1

				//---- Add audio ------------------------
			}
		}

		girlfriend[0].draw(entityCtx);

		//--------------------- Draw the player -------------------------------------------------------------------------------------------------------------------------------------------

		player.draw(entityCtx, nFrame);

		//--------------------------------------------------------------------------

		//-----------------------------------------------------------------------------------------

		ctx.clearRect(0, 0, cam.width, cam.height);

		ctx.drawImage(layoutCanvas, cam.x, cam.y, cam.width, cam.height, 0, 0, cam.width, cam.height);

		ctx.drawImage(entityCanvas, cam.x, cam.y, cam.width, cam.height, 0, 0, cam.width, cam.height);
	
		//------------------------ Display of the time ------------------------------------------------------------------------------------------------------------------------------------

		if(player.x >= 1990) {
			document.getElementById("tempo").innerHTML = "";
			document.getElementById("cartas").innerHTML = "";
		}
		else {
			if((time - Math.round((dt)/1000)) >= 0)
				document.getElementById("tempo").innerHTML = "Tempo: " + (time - Math.round((dt)/1000));
			else
				document.getElementById("tempo").innerHTML = "Tempo: 0";
			document.getElementById("cartas").innerHTML = "Cartas Restantes: " + (nCards - grabbedCards);
		}
	}

	//-------------------------------------------------------------------------------------------------------------

	function handleAction(ctx, cam, player){

		//Handler for player movement and set direction

		//Walk to the left
		if(player.keys[37] && player.x > 5 && player.control == true) {
			player.moving = true;
			player.x -= player.speed;
			player.direction[0] = true;
			player.direction[1] = false;
			player.direction[2] = false;
		}
		//Walk to the right;
		if(player.keys[39] && player.x < 2000 && player.control == true) {
			player.moving = true;
			player.x += player.speed;
			player.direction[2] = true;
			player.direction[0] = false;
			player.direction[1] = false;
		}
		//Jump
		if(player.keys[38] && !player.jumping && player.control == true){
			player.moving = true;
			player.jumping = true;
			player.yVelocity = 2;
			player.direction[1] = true;
		}

		player.y -= player.yVelocity;

		if(player.jumping && player.y < 90){
				player.yVelocity = -2;
		}

		if (player.y == 160 && player.jumping) {
			player.yVelocity = 0;
			player.jumping = false;
		}

		if(!player.keys[37] && !player.keys[39] && !player.keys[38]){
			player.moving = false;
		}

		if(player.x >= 1990) {

			player.speed = 0.7;
			player.control = false;

			if(player.x < 2250) {

				player.moving = true;
				player.direction[2] = true;
				player.direction[0] = false;
				player.direction[1] = false;
				player.x += player.speed;
			}

			if(player.x == 2250) {
				//Cada carta apanhada vale 1 pontos positivos de karma. Cada vez que se choca com picos, perde-se 0.5 pontos de karma.
				var pontosKarma = grabbedCards*1;
				var msg = "15/" + pontosKarma;
				parent.parent.postMessage(msg, '*');
			}
		}
		//----------------------------------------------------------------------------------------------------------------

		//Snap camera to player position;
		cam.snapTo(player, 2);
	}
}