"use strict"

class AnimSheet{
	//stepX/stepY: interval between each sprite and each line;
	//lineNum: number of lines of sprites (each one representing an animation);

	constructor(image, stepX, stepY, lineNum){
		this.image = image;
		this.stepX = stepX;
		this.stepY = stepY;
		this.lineNum = lineNum;
	}
}