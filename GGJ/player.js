function Player(node){

	this.node = node;
	//this.animations = animations;

	this.grace = false;
	this.replay = 3;
	this.suspicion = 0; 
	this.timer = 2000;
	this.respawnTime = -1;
	this.facingRight = true;
	this.speed = 0;
	

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
		this.timer--;
		if((this.respawnTime > 0) && (((new Date()).getTime()-this.respawnTime) > 3000)){

			this.grace = false;
			$(this.node).fadeTo(500, 1); 
			this.respawnTime = -1;
		}
	};

	this.speedUp = function(){
		this.running = true;
		this.speed += 1;
		if (this.speed > 15){
			this.speed = 15;
		}

	};


	this.keydown = function(keyCode){
		// if(!gameOver && !playerHit){
		// 	switch(keyCode){
		// 		case 75: //this is shoot (k)
		// 			//shoot missile here

		// 			break;
		// 		case 65: //this is left! (a)
		// 			if (!$("#player")[0].player.running){
		// 				$("#playerBody").setAnimation(playerAnimation["run-backward"]);
		// 			}
		// 			$("#player")[0].player.speedUp();
		// 			break;
		// 		case 87: //this is up! (w)

		// 			break;
		// 		case 68: //this is right (d)
		// 			if(!$("#player")[0].player.running){
		// 				$("#playerBody").setAnimation(playerAnimation["run-forward"]);
		// 			}
		// 			$("#player")[0].player.speedUp();

		// 			break;
		// 		case 83: //this is down! (s)

		// 			break;
		// 	}
		// }
	};

	this.keyup = function(keyCode){
		//if(!gameOver && !playerHit){

		// switch(keyCode){
		// 	case 65: //this is left! (a)
		// 		$("#player")[0].player.slowDown('left');
		// 		$("#playerBody").setAnimation(playerAnimation["idle-backward"]);
		// 		break;
		// 	case 87: //this is up! (w)

		// 		break;
		// 	case 68: //this is right (d)
		// 		$("#player")[0].player.rightMomentum();
		// 		$("#playerBody").setAnimation(playerAnimation["idle-forward"]);
		// 		break;
		// 	case 83: //this is down! (s)

		// 		break;
		// 	}
		// }
	};
	
	return true;
}