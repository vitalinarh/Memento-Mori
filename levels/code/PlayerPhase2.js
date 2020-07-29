"use strict"

class Player extends Entity{

	constructor(x, y, health, attack, speed, spriteSheet){
		super(x, y, health, attack, speed, spriteSheet)

		//Temporary;
		this.dimX = spriteSheet.stepX;
		this.dimY = spriteSheet.stepY;

		//array for direction input, 0 for left, 1 for 
		this.direction = new Array();

		this.keys = new Array();

		this.anim = 1;
		this.frame = 0;
		this.xVelocity = 0;
		this.yVelocity = 0;

		this.moving = false;
		this.jumping = false;
		this.shooting = false;

		this.health = 3;
		this.nHits = 0;

		//Attach collision boxes;
		this.collisionBox = new CollisionBox(this, 24, 24, Math.round(this.dimX/2) - 12, Math.round(this.dimY) - 24);
	}

	draw(ctx){
		//Temporary: change sizes accordingly to "AnimSheet" class;
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);

		//left
		if (this.direction[0] == true)
			this.anim = 0;

		//right
		if (this.direction[2] == true)
			this.anim = 1;

		if(!this.moving && this.direction[2] == true){
			this.anim = 1;
			this.frame = 0;
		}

		if(!this.moving && this.direction[0] == true){
			this.anim = 0;
			this.frame = 2;
		}


		if(this.jumping && this.direction[0]){
			this.anim = 0;
			this.frame = 0;
		}

		if(this.jumping && this.direction[2]){
			this.anim = 1;
			this.frame = 0;
		}

		ctx.drawImage(this.spriteSheet.image, this.frame * this.dimX, this.anim * this.dimY, this.dimX, this.dimY, this.x, this.y, this.dimX, this.dimY);
	}

	updateAnim(){
		if(!this.jumping & this.moving)
				this.frame = (this.frame + 1) % 3;
	}
}