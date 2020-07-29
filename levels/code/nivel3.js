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
	var health = 3;

	//--------------------------- Manage frame count ----------------------------------------------------------------------------------------------------------------------------------------
	
	var frameNum = 0;
	var frameCycle = 10;
	var nFrame = 0;

	//--------------------------- Health of the Character ----------------------------------------------------------------------------------------------------------------------------------
	
	var health = 3;

	//---------------------------------------------------------------------------------------------------------------------------
	//--------------------------- Number of sweets and array ------------------------------------------------------------------------
	
	var nWood = 9;
	var woodArray = new Array(nWood);

	//--------------------------- Number of sweets and array ------------------------------------------------------------------------
	
	var nSoldiers = 3;
	var soldiersArray = new Array(nSoldiers);

	//-----------------------------------------------------------------------------------------------------------------------------

	var finishedLoading = false;

	//-------------------------- Load Images -------------------------------------------------------------------------------------------------------------------------------------------
	
	//-------------------------- Character -------------------------------------------------------------------------------------------------------------------------------------------

	var playerAnim = new Image();
	playerAnim.id = "playerAnim";
	playerAnim.addEventListener("load", loadHandler);
	playerAnim.src = "assets/phase3.png";

	//-------------------------- Soldado 1 -------------------------------------------------------------------------------------------------------------------------------------------

	var soldier1 = new Image();
	soldier1.id = "soldier1";
	soldier1.addEventListener("load", loadHandler);
	soldier1.src = "assets/soldado1.png";

	//-------------------------- Soldado 2 -------------------------------------------------------------------------------------------------------------------------------------------

	var soldier2 = new Image();
	soldier2.id = "soldier2";
	soldier2.addEventListener("load", loadHandler);
	soldier2.src = "assets/soldado2.png";

	//-------------------------- Soldado 3 -------------------------------------------------------------------------------------------------------------------------------------------

	var soldier3 = new Image();
	soldier3.id = "soldier3";
	soldier3.addEventListener("load", loadHandler);
	soldier3.src = "assets/soldado3.png";

	//-------------------------- Backdrop  -------------------------------------------------------------------------------------------------------------------------------------------

	var layout = new Image();
	layout.id = "layout";
	layout.addEventListener("load", loadHandler);
	layout.src = "assets/treino.png";	

	//--------------------------  Layout -------------------------------------------------------------------------------------------------------------------------------------------
	
	var layoutHit = new Image();
	layoutHit.id = "layoutHit";
	layoutHit.addEventListener("load", loadHandler);
	layoutHit.src = "assets/testHitV1.png";

	//--------------------------  Wood -------------------------------------------------------------------------------------------------------------------------------------------
	
	var wood = new Image();
	wood.id = "wood";
	wood.addEventListener("load", loadHandler);
	wood.src = "assets/wood.png";

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
			
			layoutCtx.drawImage(layout, 0, 20, layoutWidth, layoutHeight);

			loaded++;
		}

		if(img.id == "layoutHit"){

			//-----------------------------Size of collision layout given----------------------------------------------------------------------------------------------------------------
			
			
			var layoutHitWidth = layoutHit.naturalWidth;
			var layoutHitHeight = layoutHit.naturalHeight;

			loaded++;
		}

		if(img.id == "playerAnim"){

			var playerSheet = new AnimSheet(playerAnim, 54, 100, 3);
			var playerSheetloaded = true;
			loaded++;

		}

		if(img.id == "wood"){

			for  (var i = 0; i < nWood; i++){

				if(i == 0){

					var x = (i + 2) * 100;

					var y = 210;
				}

				else{

					var x = woodArray[i - 1].x;
					var space = Math.round((Math.random() * 90) + 130); 
					var x = x + space;
					var y = 210;
				}

				woodArray[i] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);

			}

			loaded++;

		}

		if(img.id == "soldier1"){

			var x = 1900;
			var y = 135;

			soldiersArray[0] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);

			loaded++;

		}

		if(img.id == "soldier2"){

			var x = 1000;
			var y = 132;

			soldiersArray[1] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);

			loaded++;

		}

		if(img.id == "soldier3"){

			var x = 500;
			var y = 132;

			soldiersArray[2] = new SpriteImage(x, y, img.naturalWidth, img.naturalHeight, 1, false, img, 0, 0, 1, 2);

			loaded++;

		}
		//-------------------------When all  components all loaded---------------------------------------------------------------------------------------------------------------------

		if(finishedLoading && playerSheetloaded){	

			var player = new Player(50, 140, 100, 40, 2, playerSheet);

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
			
			gameLoop(ctx, cam, player, woodArray);
		}
	}

	//--------------------------------------------------------------------------------------------------------

	function gameLoop(ctx, cam, player, woodArray){	
		var t = function(time){
			gameLoop(ctx, cam, player, woodArray);
		}

		var reqID = window.requestAnimationFrame(t);

		//----------------------Frame cicle resets every x number of frames (animation timer)-----------------------------------------------------------------------------------------

		frameNum += 1;
		if(frameNum % frameCycle == 0){
			frameNum = 0;
			player.updateAnim();
		}

		//----------------------Draw layers onto viewport canvas with render--------------------------------------------------------------------------------------------------------------
		
		render(ctx, cam, player, woodArray);
	}

	//------------------------------------------------------------------------------------------------------

	function render(ctx, cam, player, woodArray){

		//Movement, attack, block;
		handleAction(ctx, cam, player);

		entityCtx.clearRect(cam.x, cam.y, cam.width, cam.height);
		entityHitCtx.clearRect(cam.x, cam.y, cam.width, cam.height);

		for (var i = nSoldiers - 1; i >= 0; i--) {

			soldiersArray[i].draw(entityCtx);
		
		}
	
		for (var i = nWood - 1; i >= 0; i--) {

			woodArray[i].x -= 1;

			if (woodArray[i].toDraw)
				woodArray[i].draw(entityCtx);

			if(woodArray[i].toDraw == false)
				woodArray[i].clear(entityCtx);
		
		}

		//--------------------------------- Check for the collision with the wood ------------------------------------------------------------------------------------------------------------------
		for (var i = 0; i < woodArray.length; i++) {

			if (woodArray[i].toDraw){

				var  verifica = woodArray[i].intersecao(player);

				if(verifica == 1) {
					player.nHits += 1;
				}
			}

			//------------------------------ Accounting the hits on the player --------------------------------------------------------------------------------------------------------------------------
			
			if(player.nHits == 10 && player.health >= 0){

				player.health -= 1;
				var hearth = document.getElementById("heart" + (player.health + 1));
				hearth.style.visibility = "hidden";
				player.nHits = 0;

				//---- Add audio ------------------------
				audio.play();

				if(player.health == 0)
					parent.parent.postMessage("23", '*');
			}
		}

		//--------------------- Draw the player -------------------------------------------------------------------------------------------------------------------------------------------

		player.draw(entityCtx, nFrame);

		//-----------------------------------------------------------------------------------------

		ctx.clearRect(0, 0, cam.width, cam.height);

		ctx.drawImage(layoutCanvas, cam.x, cam.y, cam.width, cam.height, 0, 0, cam.width, cam.height);

		ctx.drawImage(entityCanvas, cam.x, cam.y, cam.width, cam.height, 0, 0, cam.width, cam.height);
	}

	//-------------------------------------------------------------------------------------------------------------

	function handleAction(ctx, cam, player){

		//Handler for player movement and set direction

		//Walk to the left
		if(player.keys[37] && player.x > 5 && player.control == true){
			player.moving = true;
			player.x -= player.speed;
			player.direction[0] = true;
			player.direction[1] = false;
			player.direction[2] = false;
		}
		//Walk to the right;
		if(player.keys[39] && player.x < 1840 && player.control == true){
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

		if (player.y == 140 && player.jumping) {
			player.yVelocity = 0;
			player.jumping = false;
		}

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
				parent.parent.postMessage("24", '*');
			}
		}
		//----------------------------------------------------------------------------------------------------------------

		//Snap camera to player position;
		cam.snapTo(player, 3);
	}
}