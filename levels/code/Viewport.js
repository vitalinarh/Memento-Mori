"use strict"

class Viewport{
	//x/y: viewport position;
	//width/height: viewport dimensions;

	//snapTo: adjust viewport position to be centered on a given entity;

	constructor(x, y, width, height){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	snapTo(entity, nivel){

		if(nivel == 1){
			if(entity.x < 2150 && entity.x > 22)
				this.x = entity.x + Math.round(entity.dimX/2) - 50;
		}

		if(nivel == 2){
			if(entity.x < 2200 && entity.x > 22)
				this.x = entity.x + Math.round(entity.dimX/2) - 50;
		}

		if(nivel == 3){
			if(entity.x < 1724 && entity.x > 22)
				this.x = entity.x + Math.round(entity.dimX/2) - 50;
		}

		if(nivel == 4){
			if(entity.x < 1800 && entity.x > 22)
				this.x = entity.x + Math.round(entity.dimX/2) - 50;
		}
		if(nivel == 5){
			if(entity.x < 1282 && entity.x > 94)
				this.x = entity.x + Math.round(entity.dimX/2) - 120;
		}

		this.y = 160 + Math.round(entity.dimY/2) - 130;
	}
}