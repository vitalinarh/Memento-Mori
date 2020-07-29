"use strict"

class Level{
	constructor(layoutCanvas, layoutCtx, layout, camWidth, camHeight, initX, initY){

		//Set layout of whole level and draw it (terrain and static boundaries)
		this.layoutCanvas = layoutCanvas;
		this.layoutCtx = layoutCtx;

		this.layout = layout;

		//Set "camera" dimensions and starting point
		this.camWidth = camWidth;
		this.camHeight = camHeight;

		this.offsetX = initX;
		this.offsetY = initY;

		//...
		this.keys = new Array();
	}

	draw(ctx){
		//console.log("Drawing...");
		ctx.drawImage(this.layoutCanvas, this.offsetX, this.offsetY, this.camWidth, this.camHeight, 0, 0, this.camWidth, this.camHeight);
	}

	clear(ctx){
		ctx.clearRect(0, 0, 192, 192);
	}
}