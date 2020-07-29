"use strict";

(function(){
	window.addEventListener("load", main);
}());

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function main(){
	//-------------------------------Audio-----------------------------------------------------------------------

	var audio = document.getElementsByTagName("audio")[0];
	
	//------------------------------------------------------------------------------------------------------------
	//-------------------------- Manage Loaded Images---------------------------------------------------------------------------------------------------------------------------------------
	
	var loaded = 0;
	var total = 3;

	//--------------------------- Manage frame count ----------------------------------------------------------------------------------------------------------------------------------------
	
	var frameNum = 0;
	var frameCycle = 10;
	var nFrame = 0;

	//---------------------------------------------------------------------------------------------------------------------------
	//--------------------------- Number of sweets and array ------------------------------------------------------------------------
	
	var nSweets = 9;
	var grabbedSweets = 0;
	var sweetsArray = new Array(nSweets);
	var familia = new Array(1);

	//-----------------------------------------------------------------------------------------------------------------------------

	var finishedLoading = false;

	//-------------------------- Load Images -------------------------------------------------------------------------------------------------------------------------------------------
	
	//-------------------------- Character -------------------------------------------------------------------------------------------------------------------------------------------

	var playerAnim = new Image();
	playerAnim.id = "playerAnim";
	playerAnim.addEventListener("load", loadHandler);
	playerAnim.src = "assets/phase12.png";

	//-------------------------- Backdrop  -------------------------------------------------------------------------------------------------------------------------------------------

	var layout = new Image();
	layout.id = "layout";
	layout.addEventListener("load", loadHandler);
	layout.src = "assets/FirstBackground.png";

	//--------------------------  Layout -------------------------------------------------------------------------------------------------------------------------------------------
	
	var layoutHit = new Image();
	layoutHit.id = "layoutHit";
	layoutHit.addEventListener("load", loadHandler);
	layoutHit.src = "assets/testHitV1.png";

	//--------------------------  Sweets -------------------------------------------------------------------------------------------------------------------------------------------
	
	var sweet = new Image();
	sweet.id = "sweet";
	sweet.addEventListener("load", loadHandler);
	sweet.src = "assets/sweet.png";

	//--------------------------  Family -------------------------------------------------------------------------------------------------------------------------------------------

	var familyImage = new Image();
	familyImage.id = "familia";
	familyImage.addEventListener("load", loadHandler);
	familyImage.src = "assets/familia.png";
	
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
			
			layoutCtx.drawImage(layout, 0, -65, layoutWidth, layoutHeight);

			loaded++;
		}

		if(img.id == "layoutHit"){

			//-----------------------------Size of collision layout given----------------------------------------------------------------------------------------------------------------
			
			
			var layoutHitWidth = layoutHit.naturalWidth;
			var layoutHitHeight = layoutHit.naturalHeight;

			loaded++;
		}

		if(img.id == "playerAnim"){

			var playerSheet = new AnimSheet(playerAnim, 37, 72, 3);
			var playerSheetloaded = true;
			loaded++;

		}

		if(img.id == "familia"){

			var x = 2100;
			var y = 133;

			familia[0] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);
				
		}

		if(img.id == "sweet"){

			for (var i = 0; i < nSweets; i++) {

				if(i == 0){

					var x = (i + 2) * 100;
					var y = 120;
				}

				else{

					var x = sweetsArray[i - 1].x;
					var space = Math.round((Math.random() * 130) + 100); 
					var x = x + space;
					var y = Math.floor((Math.random() * 130) + 110);;

				}

				sweetsArray[i] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);
				var sweetsReady = true;
			}

			loaded++;
		}

		var now = new Date().getTime();
		var millisecondsToWait = 3000;

		while((new Date().getTime() < now + millisecondsToWait) && loaded == 5) {

		}

		console.log(loaded);

		//-------------------------When all  components all loaded---------------------------------------------------------------------------------------------------------------------

		if(finishedLoading && playerSheetloaded){	

			var player = new Player(50, 160, 100, 40, 2, playerSheet);

			//-----------------------Declare camera dimensions and starting point-------------------------------------------------------------------------------------------------------
			
			var cam = new Viewport(0, 0, 300, 400);

			//-----------------------Key listeners for movement of the character--------------------------------------------------------------------------------------------------------
			
			window.addEventListener("keydown", function(ev){ 
				player.keys[ev.keyCode] = true; 
			});

			window.addEventListener("keyup", function(ev){
				player.keys[ev.keyCode] = false;
			});

			
			//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

			//----------------------Start game loop-------------------------------------------------------------------------------------------------------------------------------------------
			
			gameLoop(ctx, cam, player, familia, sweetsArray);
		}
	}

	//--------------------------------------------------------------------------------------------------------

	function gameLoop(ctx, cam, player, family, sweetsArray){	

		var t = function(time){
			gameLoop(ctx, cam, player, family, sweetsArray);
		}

		var reqID = window.requestAnimationFrame(t);

		//----------------------Frame cicle resets every x number of frames (animation timer)-----------------------------------------------------------------------------------------

		frameNum += 1;
		if(frameNum % frameCycle == 0){
			frameNum = 0;
			player.updateAnim();
		}

		//----------------------Draw layers onto viewport canvas with render--------------------------------------------------------------------------------------------------------------
		
		render(ctx, cam, player, sweetsArray);
	}

	//------------------------------------------------------------------------------------------------------

	function render(ctx, cam, player, sweetsArray){

		//Movement, attack, block;
		handleAction(ctx, cam, player);

		entityCtx.clearRect(cam.x, cam.y, cam.width, cam.height);
		entityHitCtx.clearRect(cam.x, cam.y, cam.width, cam.height);

		//------------------------ Draw the sweets --------------------------------------------------------------------------------------------------------------------------------------
		
		for (var i = nSweets - 1; i >= 0; i--) {

			if(sweetsArray[i].toDraw){


				if(sweetsArray[i].direction == 0){

					sweetsArray[i].y -= 1;

					if(sweetsArray[i].y < 90)

						sweetsArray[i].direction = 1;

				}

				if(sweetsArray[i].direction == 1){

					sweetsArray[i].y += 1;

					if(sweetsArray[i].y > 150)

						sweetsArray[i].direction = 0;

				}

				sweetsArray[i].draw(entityCtx);

			}

			if(sweetsArray[i].toDraw == false)

				sweetsArray[i].clear(entityCtx);
		
		}


		//---------------------- Check for the colisions with the sweets ------------------------------------------------------------------------------------------------------------------
		
		for (var i = 0; i < sweetsArray.length; i++) {

			if (sweetsArray[i].toDraw){

				var  verifica = sweetsArray[i].intersecao(player);

				if(verifica == 1){

					//---- Add audio ------------------------
					audio.play();

					player.nHits += 1;
					console.log("hit Cartas")
				}
			}

			//------------------------------ Accounting the hits on the player --------------------------------------------------------------------------------------------------------------------------
			 
			if(player.nHits == 5) {

				sweetsArray[i].clear(entityCtx);

				sweetsArray[i].toDraw = false;

				player.nHits = 0;

				grabbedSweets += 1

				//---- Add audio ------------------------
			}
		}

		//--------------------- Draw the player -------------------------------------------------------------------------------------------------------------------------------------------

		familia[0].draw(entityCtx, nFrame);

		player.draw(entityCtx, nFrame);

		//-----------------------------------------------------------------------------------------

		ctx.clearRect(0, 0, cam.width, cam.height);

		ctx.drawImage(layoutCanvas, cam.x, cam.y, cam.width, cam.height, 0, 0, cam.width, cam.height);

		ctx.drawImage(entityCanvas, cam.x, cam.y, cam.width, cam.height, 0, 0, cam.width, cam.height);


		//------------------------ Display of the number of sweets grabbed ------------------------------------------------------------------------------------------------------------------------------------

		if(player.x >= 1800) {
			document.getElementById("doces").innerHTML = "";
		}
		else {
			document.getElementById("doces").innerHTML = "Rebuçados Restantes: " + (nSweets - grabbedSweets);
		}
	}

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
		if(player.keys[39] && player.x < 1800 && player.control == true) {
			player.moving = true;
			player.x += player.speed;
			player.direction[2] = true;
			player.direction[0] = false;
			player.direction[1] = false;
		}
		//Jump
		if(player.keys[38] && !player.jumping && player.control == true) {
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

		if(player.x >=  1800) {

			player.speed = 0.7;
			player.control = false;

			if(player.x < 2050) {

				console.log(player.x);
				player.moving = true;
				player.direction[2] = true;
				player.direction[0] = false;
				player.direction[1] = false;
				player.x += player.speed;
			}

			if(player.x == 2050) {
				//Cada rebuçado apanhado vale 1 pontos positivos de karma.
				var pontosKarma = grabbedSweets * 1;
				var msg = "14/" + pontosKarma;
				parent.parent.postMessage(msg, '*');
			}
		}
		//----------------------------------------------------------------------------------------------------------------

		//Snap camera to player position;
		cam.snapTo(player, 1);
	}
}