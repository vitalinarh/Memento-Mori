"use strict";

//-------------------------For obstacles----------------------------------------------------------------------------------------------------------------------------
class SpriteImage{
	
	constructor(x, y, w, h, speed, clickable, img, x_velocidade, y_velocidade, gravidade, sentido){
	
		this.xIni = x;
		this.yIni = y;

		this.x = x;
		this.y = y;

		this.width = w;
		this.height = h;

		this.speed = speed;

		this.x_velocidade = x_velocidade;
		this.y_velocidade = y_velocidade;

		//imagem
		this.img = img;	
		this.toDraw = true;	
		this.direction = 0; //0 for down, 1 for up			
	}


	draw(ctx){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
	}


	clear(ctx){
		ctx.clearRect(this.x, this.y, this.width, this.height);
	}	


	reset(ev, ctx){

		this.clear(ctx);
		this.x = this.xIni;
		this.y = this.yIni;
	}

	//----------------------------For collision checking--------------------------------------------------------------------------------------------
	
	/*
	getimagedata(){
		if(this.img.id!="background")
		{
			var canvas = document.createElement("canvas");
			canvas.width = Math.round(this.width);
			canvas.height = this.height;
			var ctx = canvas.getContext("2d");
			ctx.drawImage(this.img,0,0,Math.round(this.width),this.height);
			return ctx.getImageData(0,0,Math.round(this.width),this.height);
		}
	}
	*/

	update_x(tipo){

		this.x_velocidade+=0.5*this.speed;

		if(tipo==0){

			this.x_velocidade *= 0.9;

			this.x += this.x_velocidade;

			if(this.x > 870-this.width){

				this.x_velocidade = 0;
			}
		}

		else{

			this.x_velocidade *= 0.9;

			this.x -= this.x_velocidade;

			if(this.x < 0){

				this.x_velocidade = 0;
			}
		}

	}

	intersecao(sprite, ctx){

		var x_esquerda = sprite.x + 17;
		var y_cima = sprite.y;
		var x_direita = sprite.x + sprite.dimX - 20;
		var y_baixo = sprite.y + sprite.dimY;
		var aux = 0;

		if((x_esquerda >= this.x) && (x_esquerda <= this.x + this.width)){
			
			if((y_cima >= this.y) && (y_cima <= this.y + this.height)){
				return 1;
			}
			else if((y_baixo >= this.y) && (y_baixo <= this.y + this.height)){
			 	return 1;
			}
			else if((y_baixo >= this.y + this.height) && (y_cima <= this.y))
				return 1;
		}

		else if((x_direita >= this.x) && (x_direita <= this.x + this.width)){
			if((y_cima >= this.y) && (y_cima <= this.y + this.height)){
				return 1;		
			}
			else if((y_baixo >= this.y) && (y_baixo <= this.y + this.height)){
				return 1;
			}
			else if((y_baixo >= this.y + this.height) && (y_cima <= this.y))
				return 1;
		}
		else if ((x_esquerda < this.x) && (x_direita > this.x + this.width)){
			if((y_cima >= this.y) && (y_cima <= this.y + this.height)){
				return 1;
			}
			else if((y_baixo >= this.y) && (y_baixo <= this.y + this.height)){
			 	return 1;
			}
		}
		return aux;
	}
}