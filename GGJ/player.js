function Player(node){
  var SUSPICION_MAX = 24; // The game will end at MAX + 1

	this.node = node;
	//this.animations = animations;

	this.grace = false;
	this.replay = 3;
	this.suspicion = 0; 
	this.respawnTime = -1;
	this.speed = 0;
	this.topSpeed = 50;
	this.runInput = false;
	this.facingRight = true;
	this.runSpeed = 35;

	this.currentAnimation = 'idle-forward';

	this.friction = function() {
		if (!this.runInput){
			if (Math.abs(this.speed) < 3){
				this.speed = 0;
			} else if (this.speed < 0){
				this.speed += Math.random()*3;
			} else {
				this.speed -= Math.random()*3;
			}
		}
		this.facingRight = (this.speed >= 0);
	};

	this.acceleration = function(direction){
		return direction*Math.atan(Math.abs(this.speed)) + Math.random()*direction;
	};
	
	// This function damage the ship and return true if this cause the ship to die 
	this.damage = function(){
		if(!this.grace){
			this.suspicion--;
			if (this.suspicion == 0){
				return true;
			}
			return false;
		}
		return false;
	};
	
	// this try to respawn the ship after a death and return true if the game is over
	this.respawn = function(){
		this.replay--;
		if(this.replay==0){
			return true;
		}
		
		this.grace 	= true;
		this.suspicion	= 3;
		
		this.respawnTime = (new Date()).getTime();
		$(this.node).fadeTo(0, 0.5); 
		return false;
	};
	
	this.update = function(){
		this.friction();
		this.setAnimation();
		if((this.respawnTime > 0) && (((new Date()).getTime()-this.respawnTime) > 3000)){

			this.grace = false;
			$(this.node).fadeTo(500, 1); 
			this.respawnTime = -1;
		}
	};

	this.keydown = function(keyCode){

		switch(keyCode){
			case 75: //this is shoot (k)
				//shoot missile here

				break;
			case 65: //this is left! (a)
				this.runInput = true;
				var acc = this.acceleration(-1);
				this.speed += acc;
				//(this.speed > -(this.topSpeed - acc)) ? (this.speed -= acc) : -this.topSpeed;
				break;
			case 87: //this is up! (w)

				break;
			case 68: //this is right (d)
				this.runInput = true;
				var acc = this.acceleration(1);
				this.speed += acc;
				
				//this.speed = (this.speed < (this.topSpeed - acc)) ? (this.speed += acc) : this.topSpeed;
				break;
			case 83: //this is down! (s)

				break;
		}
		this.setAnimation();
	};

	this.keyup = function(keyCode){
		switch(keyCode){
			case 65: //this is left! (a)
				this.runInput = false;
				
				break;
			case 87: //this is up! (w)

				break;
			case 68: //this is right (d)
				this.runInput = false;
				
				break;
			case 83: //this is down! (s)

				break;
		}
	};

	this.setAnimation = function(){
		var newAnimation = "idle-forward";

		if (this.speed > this.runSpeed){
			newAnimation = "run-forward";
		} else if (this.speed > 0){

			newAnimation = "walk-forward";

		} else if (this.speed == 0){

			if (this.facingRight){
				newAnimation = "idle-forward";
			} else {
				newAnimation = "idle-backward";
			}

		} else if (this.speed > -this.runSpeed){
			newAnimation = "walk-backward";
		} else {
			newAnimation = "run-backward";
		}

		if (newAnimation != this.currentAnimation){
			$("#playerBody").setAnimation(playerAnimation[newAnimation]);
			this.currentAnimation = newAnimation;
		}
	};

	// Adjust the player's suspicion value
	this.increaseSuspicion = function(value) {
		value = parseInt(value);
		this.suspicion += value;
		if (this.suspicion > SUSPICION_MAX) {
			gameOver = true;
			console.log('gameover');
		}
	}
	
	return true;
}

