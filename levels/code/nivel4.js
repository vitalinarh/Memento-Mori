"use strict";

(function(){
	window.addEventListener("load", main);
}());

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function main(){
	//-------------------------------Audio-----------------------------------------------------------------------

	var audio = document.getElementsByTagName("audio")[0];
	var audio2 = document.getElementsByTagName("audio")[1];
	var audio3 = document.getElementsByTagName("audio")[2];

	//-------------------------- Manage Loaded Images---------------------------------------------------------------------------------------------------------------------------------------
	var loaded = 0;
	var total = 6;
	var finishedLoading = false;
	//--------------------------- Health of the Character ----------------------------------------------------------------------------------------------------------------------------------
	var health = 3;
	//--------------------------- Number of Mines and Array------------------------------------------------------------------------------------------------------------------------------
	var nMinas = 10;
	var minasArray = new Array(nMinas);
	var nCanhoes = 3;
	var canhoesArray = new Array(nCanhoes);
	var balasArray = new Array(nCanhoes);
	var friendArray = new Array(1);
	//--------------------------- Manage frame count ----------------------------------------------------------------------------------------------------------------------------------------
	var frameNum = 0;
	var frameCycle = 10;
	var nFrame = 0;
	//-------------------------- Load Images -------------------------------------------------------------------------------------------------------------------------------------------
	
	//-------------------------- Character -------------------------------------------------------------------------------------------------------------------------------------------
	
	var playerAnim = new Image();
	playerAnim.id = "playerAnim";
	playerAnim.addEventListener("load", loadHandler);
	playerAnim.src = "assets/bonequitoyo.png";

	//-------------------------- Backdrop  -------------------------------------------------------------------------------------------------------------------------------------------
	
	var layout = new Image();
	layout.id = "layout";
	layout.addEventListener("load", loadHandler);
	layout.src = "assets/WarBackdrop.png";

	//--------------------------  Layout -------------------------------------------------------------------------------------------------------------------------------------------
	
	var layoutHit = new Image();
	layoutHit.id = "layoutHit";
	layoutHit.addEventListener("load", loadHandler);
	layoutHit.src = "assets/testHitV1.png";

	//-------------------------- Mines -------------------------------------------------------------------------------------------------------------------------------------------

	var mina = new Image();
	mina.id = "mina";
	mina.addEventListener("load", loadHandler);
	mina.src = "assets/mina.png";

	//-------------------------- Cannon -------------------------------------------------------------------------------------------------------------------------------------------

	var canhao = new Image();
	canhao.id = "canhao";
	canhao.addEventListener("load", loadHandler);
	canhao.src = "assets/canhao.png";

	//-------------------------- Cannonballs -------------------------------------------------------------------------------------------------------------------------------------------

	var bala = new Image();
	bala.id = "bala";
	bala.addEventListener("load", loadHandler);
	bala.src = "assets/bala.png";

	//-------------------------- Frend -------------------------------------------------------------------------------------------------------------------------------------------

	var friend = new Image();
	friend.id = "friend";
	friend.addEventListener("load", loadHandler);
	friend.src = "assets/ambrosio.png";

	finishedLoading = true;

	//----------------------Only visible canvas, equivalent to a camera or the game window---------------------------------------------------------------------------------------------------

	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	//------------------------ Scaled up to 3x -----------------------------------------------------------------------------------------------------------------------------------------------------
	
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

	//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

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

		//----------------------------Player-----------------------------------------------------------------------------------------------------------------------------------------------

		if(img.id == "playerAnim"){

			var playerSheet = new AnimSheet(playerAnim, 67, 94, 3);
			var playerSheetloaded = true;
			loaded++;
		}

		//--------------------------Mines---------------------------------------------------------------------------------------------------------------------------------------------

		if(img.id == "mina"){

			for (var i = 0; i < nMinas; i++) {

				if(i == 0){

					var x = (i + 2) * 100;
					var y = 236;
				}

				else{

					var x = minasArray[i - 1].x;
					var space = Math.round((Math.random() * 95) + 70); 
					var x = x + space;
					var y = 235;

				}

				minasArray[i] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);
				var minasReady = true;
			}

			loaded++;
		}

		//-------------------------- Cannons -------------------------------------------------------------------------------------------------------------------------------------------

		if(img.id == "canhao"){

			for  (var i = 0; i < nCanhoes; i++){

				if(i == 0){

					var x = minasArray[nMinas - 1].x + 50;

					var y = 210;
				}

				else{
					var x = canhoesArray[i - 1].x;
					var space = Math.round((Math.random() * 90) + 100); 
					var x = x + space;
					var y = 210;
				}

				canhoesArray[i] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);

			}

			loaded++;
		}

		//-------------------------- Cannonballs ------------------------------------------------------------------------------------------------------------------------------------------


		if(img.id == "bala"){

			for (var i = 0; i < nCanhoes; i++){

				var x = canhoesArray[i].x - 25;
				var y = 223;
				balasArray[i] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);

			}

			loaded++;
		}

		//-------------------------- Cannonballs ------------------------------------------------------------------------------------------------------------------------------------------


		if(img.id == "friend"){

			var x = 1920;
			var y = 220;
			friendArray[0] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);
			var friendReady = true;
			loaded++;
		}

		//-------------------------When all  components all loaded---------------------------------------------------------------------------------------------------------------------

		if(finishedLoading && playerSheetloaded){	

			var player = new Player(50, 160, 100, 40, 2, playerSheet);

			//-----------------------Declare camera dimensions and starting point-------------------------------------------------------------------------------------------------------
			var cam = new Viewport(100, 0, 300, 300);

			//-----------------------Key listeners for movement of the character--------------------------------------------------------------------------------------------------------
			
			window.addEventListener("keydown", function(ev){ 
				player.keys[ev.keyCode] = true; 
			});

			window.addEventListener("keyup", function(ev){
				player.keys[ev.keyCode] = false;
			});

			//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

			//----------------------Start game loop-------------------------------------------------------------------------------------------------------------------------------------------
			gameLoop(ctx, cam, player, friendArray, minasArray);
		}
	}

	//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	function gameLoop(ctx, cam, player, friendArray, minasArray){

		var t = function(time){
			gameLoop(ctx, cam, player, friendArray, minasArray);
		}

		var reqID = window.requestAnimationFrame(t);

		//----------------------Frame cicle resets every x number of frames (animation timer)-----------------------------------------------------------------------------------------

		frameNum += 1;
		if(frameNum % frameCycle == 0){
			frameNum = 0;
			player.updateAnim();
		}

		//----------------------Draw layers onto viewport canvas with render--------------------------------------------------------------------------------------------------------------
		
		render(ctx, cam, player, friendArray, minasArray);
	}

	//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

	function render(ctx, cam, player, friendArray, minasArray){

		//--------------------------Movement of the player--------------------------------------------------------------------------------------------------------------------------------
		
		handleAction(ctx, cam, player);
	
		entityCtx.clearRect(cam.x, cam.y, cam.width, cam.height);
		entityHitCtx.clearRect(cam.x, cam.y, cam.width, cam.height);
		

		//------------------------ Draw the mines --------------------------------------------------------------------------------------------------------------------------------------
		
		for (var i = nMinas - 1; i >= 0; i--) {

			if (minasArray[i].toDraw)
				minasArray[i].draw(entityCtx);

			
			if(minasArray[i].toDraw == false)
				minasArray[i].clear(entityCtx);
		
		}

		//--------------------- Draw the canhoes -------------------------------------------------------------------------------------------

		for(var i = nCanhoes - 1; i >= 0; i--){

			canhoesArray[i].draw(entityCtx);
		}

		//--------------------- Draw the balas pro canhao ----------------------------------------------------------------------------------------
		for(var i = nCanhoes - 1; i >= 0; i--){

			if(balasArray[i].toDraw == true)
				balasArray[i].draw(entityCtx);

			balasArray[i].x -= 2;

			if(balasArray[i].x == 0 || balasArray[i].toDraw == false){
				audio3.play();
				balasArray[i].x = canhoesArray[i].x	- 23;
				balasArray[i].toDraw = true;		
			}
		}

		//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		//---------------------- Check for the colisions with the mines ------------------------------------------------------------------------------------------------------------------
		
		for (var i = 0; i < minasArray.length; i++) {

			if (minasArray[i].toDraw){

				var  verifica = minasArray[i].intersecao(player);

				if(verifica == 1){
					player.nHits += 1;
				}
			}

			//------------------------------ Accounting the hits on the player --------------------------------------------------------------------------------------------------------------------------
			
			if(player.nHits == 5 && player.health >= 0){

				minasArray[i].clear(entityCtx);
				minasArray[i].toDraw = false;
				player.health -= 1;
				audio.play();
				var hearth = document.getElementById("heart" + (player.health + 1));
				hearth.style.visibility = "hidden";
				player.nHits = 0;

				if(player.health == 0)
					parent.parent.postMessage("29", '*');
			}
		}

		//---------------------- Check for the colisions with the cannonballs ------------------------------------------------------------------------------------------------------------------
		
		for (var i = 0; i < balasArray.length; i++) {

			if (balasArray[i].toDraw){

				var  verifica = balasArray[i].intersecao(player);

				if(verifica == 1){
					player.nHits += 1;	
				}
			}

			//------------------------------ Accounting the hits on the player --------------------------------------------------------------------------------------------------------------------------
			
			if(player.nHits == 5 && player.health >= 0){

				balasArray[i].clear(entityCtx);
				balasArray[i].toDraw = false;
				player.health -= 1;
				audio2.play();
				var hearth = document.getElementById("heart" + (player.health + 1));
				hearth.style.visibility = "hidden";
				player.nHits = 0;

				if(player.health == 0)
					parent.parent.postMessage("29", '*');
			}
		}
		//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		//--------------------- Draw the player -------------------------------------------------------------------------------------------------------------------------------------------
	
		friendArray[0].draw(entityCtx);
		
		player.draw(entityCtx, nFrame);

		//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		ctx.clearRect(0, 0, cam.width, cam.height);

		ctx.drawImage(layoutCanvas, cam.x, cam.y, cam.width, cam.height, 0, 0, cam.width, cam.height);

		ctx.drawImage(entityCanvas, cam.x, cam.y, cam.width, cam.height, 0, 0, cam.width, cam.height);

	}

	//------------------ Handle player actions (Movement) -------------------------------------------------------------------------------------------------------------------------------

	function handleAction(ctx, cam, player){

		//Handler for player movement and set direction

		//--------------------- Walk to the left and set limits------------------------------------------------------------------------------------------------------------------------------------------
		if(player.keys[37] && player.x > 5 && player.control == true){

			player.moving = true;
			player.x -= player.speed;
			player.direction[0] = true;
			player.direction[1] = false;
			player.direction[2] = false;
		}
		//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		
		//-------------------- Walk to the right and set limit ----------------------------------------------------------------------------------------------------------------------------------------
		if(player.keys[39] && player.x < 2020 && player.control == true){

			player.moving = true;
			player.x += player.speed;
			player.direction[2] = true;
			player.direction[0] = false;
			player.direction[1] = false;
		}
		//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		
		//--------------------- Jump -----------------------------------------------------------------------------------------------------------------------------------------------------
		
		if(player.keys[38] && !player.jumping && player.control == true){
			player.moving = true;
			player.jumping = true;
			player.yVelocity = 2;
			player.direction[1] = true;
		}

		player.y -= player.yVelocity;
		//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		
		//-------------------Gravity--------------------------------------------------------------------------------------------------------------------------------------------------
		if(player.jumping && player.y < 100){

				player.yVelocity = -2;
		}

		if (player.y == 160 && player.jumping) {

			player.yVelocity = 0;
			player.jumping = false;
		}
		//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		//------------------If not moving set to False----------------------------------------------------------------------------------------------------------------------------------
		
		if(!player.keys[37] && !player.keys[39] && !player.keys[38]){
			
			player.moving = false;
		}

		if(player.x >= 1500) {

			player.speed = 0.7;
			player.control = false;

			if(player.x < 1830) {

				player.moving = true;
				player.direction[2] = true;
				player.direction[0] = false;
				player.direction[1] = false;
				player.x += player.speed;
			}

			if(player.x == 1830) {
				parent.parent.postMessage("31", '*');
			}
		}
		//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

		//------------------ Match camera to the position of the character ------------------------------------------------------------------------------------------------------------------------------
		cam.snapTo(player, 4);

		//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	}
}