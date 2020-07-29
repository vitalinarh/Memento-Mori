"use strict"

class Entity{
	//x/y: entity position (upper left corner);
	//health: entity health level, to be increased or depleted;
	//attack: ammount of hit points it deals to another entity;
	//speed: movement multiplier, constant throughout the game;
	//spriteSheet: image containing all the sprites (animations) for the entity;

	constructor(x, y, health, attack, speed, spriteSheet){
		this.x = x;
		this.y = y;
		this.health = health;
		this.attack = attack;
		this.speed = speed;

		this.spriteSheet = spriteSheet;
	}
}