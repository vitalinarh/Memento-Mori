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
	var total = 4;

	//--------------------------- Manage frame count ----------------------------------------------------------------------------------------------------------------------------------------
	
	var frameNum = 0;
	var frameCycle = 10;
	var nFrame = 0;


	//---------------------------------------------------------------------------------------------------------------------------
	//--------------------------- Number of drinks and array ------------------------------------------------------------------------
	
	var nDrinks = 10;
	var drinksArray = new Array(nDrinks);
	var grabbedDrinks = 0;
	var enemyArray = new Array(1);

	//-----------------------------------------------------------------------------------------------------------------------------

	var finishedLoading = false;

	//-------------------------- Load Images -------------------------------------------------------------------------------------------------------------------------------------------
	
	//-------------------------- Death  -------------------------------------------------------------------------------------------------------------------------------------------

	var death = new Image();
	death.id = "death";
	death.addEventListener("load", loadHandler);
	death.src = "assets/death.png";

	//-------------------------- Character -------------------------------------------------------------------------------------------------------------------------------------------

	var irmao = new Image();
	irmao.id = "irmao";
	irmao.addEventListener("load", loadHandler);
	irmao.src = "assets/irmao.png";

	//-------------------------- Irmao -------------------------------------------------------------------------------------------------------------------------------------------

	var playerAnim = new Image();
	playerAnim.id = "playerAnim";
	playerAnim.addEventListener("load", loadHandler);
	playerAnim.src = "assets/velhoteyeeeee.png";

	//-------------------------- Backdrop  -------------------------------------------------------------------------------------------------------------------------------------------

	var layout = new Image();
	layout.id = "layout";
	layout.addEventListener("load", loadHandler);
	layout.src = "assets/lastBackground.png";

	//--------------------------  Layout -------------------------------------------------------------------------------------------------------------------------------------------
	
	var layoutHit = new Image();
	layoutHit.id = "layoutHit";
	layoutHit.addEventListener("load", loadHandler);
	layoutHit.src = "assets/testHitV1.png";

	//--------------------------  Drink -------------------------------------------------------------------------------------------------------------------------------------------
	
	var drink = new Image();
	drink.id = "drink";
	drink.addEventListener("load", loadHandler);
	drink.src = "assets/garrafa.png";

	//----------------------------------------------------------------------------------------------------------------------------------------

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

			var playerSheet = new AnimSheet(playerAnim, 50, 96, 3);
			var playerSheetloaded = true;
			loaded++;

		}

		if(img.id == "drink"){

			for (var i = 0; i < nDrinks; i++) {

				if(i == 0){

					var x = (i + 2) * 100;
					var y = 120;
				}

				else{

					var x = drinksArray[i - 1].x;
					var space = Math.round((Math.random() * 100) + 90); 
					var x = x + space;
					var y = Math.floor((Math.random() * 130) + 110);;

				}

				drinksArray[i] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);
				var drinksReady = true;
			}

			loaded++;
		}

		if(img.id == "death"){

			var x = -100;
			var y = 130;
			enemyArray[0] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);
			var enemyReady = true;

			loaded++;
		}

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
			
			gameLoop(ctx, cam, player, enemyArray, drinksArray);
		}
	}

	//--------------------------------------------------------------------------------------------------------

	function gameLoop(ctx, cam, player, enemy, drinksArray){

		var t = function(time){

			gameLoop(ctx, cam, player, enemy, drinksArray);
		}

		var reqID = window.requestAnimationFrame(t);

		//----------------------Frame cicle resets every x number of frames (animation timer)-----------------------------------------------------------------------------------------

		frameNum += 1;
		if(frameNum % frameCycle == 0){
			frameNum = 0;
			player.updateAnim();
		}

		//----------------------Draw layers onto viewport canvas with render--------------------------------------------------------------------------------------------------------------
		
		render(ctx, cam, player, enemy, drinksArray);
	}

	//------------------------------------------------------------------------------------------------------

	function render(ctx, cam, player, enemy, drinksArray){

		//Movement, attack, block;
		handleAction(ctx, cam, player);

		entityCtx.clearRect(cam.x, cam.y, cam.width, cam.height);
		entityHitCtx.clearRect(cam.x, cam.y, cam.width, cam.height);

		//------------------------ Draw the drinks --------------------------------------------------------------------------------------------------------------------------------------
		
		for (var i = nDrinks - 1; i >= 0; i--) {

			if(drinksArray[i].toDraw){

				if(drinksArray[i].direction == 0){

					drinksArray[i].y -= 1;

					if(drinksArray[i].y < 90)

						drinksArray[i].direction = 1;

				}

				if(drinksArray[i].direction == 1){

					drinksArray[i].y += 1;

					if(drinksArray[i].y > 150)

						drinksArray[i].direction = 0;

				}

				drinksArray[i].draw(entityCtx);

			}

			if(drinksArray[i].toDraw == false)

				drinksArray[i].clear(entityCtx);
		
		}


		//---------------------- Check for the colisions with the drinks ------------------------------------------------------------------------------------------------------------------
		
		for (var i = 0; i < drinksArray.length; i++) {

			if (drinksArray[i].toDraw){

				var  verifica = drinksArray[i].intersecao(player);

				if(verifica == 1){

					player.nHits += 1;
				}
			}

			//------------------------------ Accounting the hits on the player --------------------------------------------------------------------------------------------------------------------------
			 
			if(player.nHits == 5) {

				drinksArray[i].clear(entityCtx);

				drinksArray[i].toDraw = false;
				grabbedDrinks +=1;
				player.nHits = 0;
				player.speed -= 0.2;

				//---- Add audio ------------------------

				audio.play();
			}
		}

		var verifica = enemy[0].intersecao(player);

		if(verifica == 1){

			player.nHits2 += 1;
		}

		if(player.nHits2 == 5) {
			var pontosKarma = grabbedDrinks*1;
			var msg = "34/" + pontosKarma;
			parent.parent.postMessage(msg, '*');
		}

		//--------------------- Draw the player -------------------------------------------------------------------------------------------------------------------------------------------

		player.draw(entityCtx, nFrame);

		enemy[0].draw(entityCtx);

		enemy[0].x += 1;

		if(enemy[0].direction == 0){

				enemy[0].y -= 0.5;

				if(enemy[0].y < 125)

					enemy[0].direction = 1;

		}

		if(enemy[0].direction == 1){

			enemy[0].y += 0.5;

				if(enemy[0].y > 135)

					enemy[0].direction = 0;

		}

		//-----------------------------------------------------------------------------------------

		ctx.clearRect(0, 0, cam.width, cam.height);

		ctx.drawImage(layoutCanvas, cam.x, cam.y, cam.width, cam.height, 0, 0, cam.width, cam.height);

		ctx.drawImage(entityCanvas, cam.x, cam.y, cam.width, cam.height, 0, 0, cam.width, cam.height);
		
	}

	//-------------------------------------------------------------------------------------------------------------

	function handleAction(ctx, cam, player){

		//Handler for player movement and set direction

		//Walk to the left
		if(player.keys[37] && player.x > 5){
			player.moving = true;
			player.x -= player.speed;
			player.direction[0] = true;
			player.direction[1] = false;
			player.direction[2] = false;
		}
		//Walk to the right;
		if(player.keys[39] && player.x < 1500){
			player.moving = true;
			player.x += player.speed;
			player.direction[2] = true;
			player.direction[0] = false;
			player.direction[1] = false;
		}
		//Jump
		if(player.keys[38] && !player.jumping){
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
		//----------------------------------------------------------------------------------------------------------------

		//Snap camera to player position;
		cam.snapTo(player, 5);
	}
}