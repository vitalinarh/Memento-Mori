"use strict"

class CollisionBox{
	//entity: player/enemy to which the box is attached;
	//dimX/dimY: dimensions of collision box;
	//offsetX/offsetY: offset in relation to player possition;

	//draw: draw hit box (geometric) on the given canvas;

	constructor(entity, dimX, dimY, offsetX, offsetY){
		this.entity = entity;

		this.dimX = dimX;
		this.dimY = dimY;

		this.offsetX = offsetX;
		this.offsetY = offsetY;
	}

	draw(ctx){
		ctx.fillRect(this.entity.x + this.offsetX, 
					 this.entity.y + this.offsetY,
					 this.dimX, this.dimY);
	}
}