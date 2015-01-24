// Global constants:
var PLAYGROUND_WIDTH	= 800;
var PLAYGROUND_HEIGHT	= 400;
var REFRESH_RATE		= 15;

var GRACE		= 2000;
var MISSILE_SPEED = 10; //px per frame

/*Constants for the gameplay*/
var smallStarSpeed    	= 1 //pixels per frame
var mediumStarSpeed		= 3 //pixels per frame
var bigStarSpeed		= 4 //pixels per frame

// Gloabl animation holder
var playerAnimation = new Array();
var missile = new Array();
var enemies = new Array(3); // There are three kind of enemies in the game

// Game state
var bossMode = false;
var bossName = null;
var playerHit = false;
var timeOfRespawn = 0;
var gameOver = false;
var crowdOn = true; // include the crowd in the game

// Some hellper functions : 

// Function to restart the game:
function restartgame(){
	window.location.reload();
};


// function Enemy(node){
// 	this.suspicion	= 2;
// 	this.speedx	= -5;
// 	this.speedy	= 0;
// 	this.node = $(node);
	
// 	// deals with damage endured by an enemy
// 	this.damage = function(){
// 		this.suspicion--;
// 		if(this.suspicion == 0){
// 			return true;
// 		}
// 		return false;
// 	};
	
// 	// updates the position of the enemy
// 	this.update = function(playerNode){
// 		this.updateX(playerNode);
// 		this.updateY(playerNode);
// 	};	
// 	this.updateX = function(playerNode){
// 		this.node.x(this.speedx, true);
// 	};
// 	this.updateY= function(playerNode){
// 		var newpos = parseInt(this.node.css("top"))+this.speedy;
// 		this.node.y(this.speedy, true);
// 	};
// }

	// function Minion(node){
	// 	this.node = $(node);
	// }
	// Minion.prototype = new Enemy();
	// Minion.prototype.updateY = function(playerNode){
		
	// 	if(this.node.y() > (PLAYGROUND_HEIGHT - 100)){
	// 		this.node.y(-2, true)
	// 	}
	// }


// function Brainy(node){
// 	this.node = $(node);
// 	this.suspicion	= 5;
// 	this.speedy = 1;
// 	this.alignmentOffset = 5;
// }
// Brainy.prototype = new Enemy();
// Brainy.prototype.updateY = function(playerNode){
// 	if((this.node.y()+this.alignmentOffset) > $(playerNode).y()){
// 		this.node.y(-this.speedy, true);
// 	} else if((this.node.y()+this.alignmentOffset) < $(playerNode).y()){
// 		this.node.y(this.speedy, true);
// 	}
// }

// function Bossy(node){
// 	this.node = $(node);
// 	this.suspicion	= 20;
// 	this.speedx = -1;
// 	this.alignmentOffset = 35;
// }
// Bossy.prototype = new Brainy();
// Bossy.prototype.updateX = function(){
// 	if(this.node.x() > (PLAYGROUND_WIDTH - 200)){
// 		this.node.x(this.speedx, true)
// 	}
// }



// --------------------------------------------------------------------------------------------------------------------
// --                                      the main declaration:                                                     --
// --------------------------------------------------------------------------------------------------------------------
$(function(){
	// Aniomations declaration: 
	
	// The background:
	var background1 = new $.gQ.Animation({imageURL: "images/background1.png"});
	var background2 = new $.gQ.Animation({imageURL: "images/background2.png"});
 
	
	// Player space shipannimations:
	playerAnimation["idle-forward"]	 = new $.gQ.Animation({imageURL: "images/player-forward.png", numberOfFrame: 4, delta: 100, rate:30, type: $.gQ.ANIMATION_HORIZONTAL});
	playerAnimation["idle-backward"] = new $.gQ.Animation({imageURL: "images/player-backward.png", numberOfFrame: 4, delta: 100, rate:30, type: $.gQ.ANIMATION_HORIZONTAL});
	playerAnimation["run-forward"]	 = new $.gQ.Animation({imageURL: "images/player-run-forward.png" , numberOfFrame: 4, delta: 100, rate: 30, type: $.gQ.ANIMATION_HORIZONTAL});
	playerAnimation["run-backward"]	 = new $.gQ.Animation({imageURL: "images/player-run-backward.png", numberOfFrame: 4, delta: 100, rate: 30, type: $.gQ.ANIMATION_HORIZONTAL});
	
	// //  List of enemies animations :
		// // 1st kind of enemy:
		// enemies[0] = new Array(); // enemies have two animations
		// enemies[0]["idle"]	= new $.gQ.Animation({imageURL: "minion_idle.png", numberOfFrame: 5, delta: 52, rate: 60, type: $.gQ.ANIMATION_VERTICAL});
		// enemies[0]["explode"]	= new $.gQ.Animation({imageURL: "minion_explode.png", numberOfFrame: 11, delta: 52, rate: 30, type: $.gQ.ANIMATION_VERTICAL | $.gQ.ANIMATION_CALLBACK});
		
		// // 2nd kind of enemy:
		// enemies[1] = new Array();
		// enemies[1]["idle"]	= new $.gQ.Animation({imageURL: "brainy_idle.png", numberOfFrame: 8, delta: 42, rate: 60, type: $.gQ.ANIMATION_VERTICAL});
		// enemies[1]["explode"]	= new $.gQ.Animation({imageURL: "brainy_explode.png", numberOfFrame: 8, delta: 42, rate: 60, type: $.gQ.ANIMATION_VERTICAL | $.gQ.ANIMATION_CALLBACK});
		
		// // 3rd kind of enemy:
		// enemies[2] = new Array();
		// enemies[2]["idle"]	= new $.gQ.Animation({imageURL: "bossy_idle.png", numberOfFrame: 5, delta: 100, rate: 60, type: $.gQ.ANIMATION_VERTICAL});
		// enemies[2]["explode"]	= new $.gQ.Animation({imageURL: "bossy_explode.png", numberOfFrame: 9, delta: 100, rate: 60, type: $.gQ.ANIMATION_VERTICAL | $.gQ.ANIMATION_CALLBACK});
		
		// // Weapon missile:
		// missile["player"] = new $.gQ.Animation({imageURL: "player_missile.png", numberOfFrame: 6, delta: 10, rate: 90, type: $.gQ.ANIMATION_VERTICAL});
		// missile["enemies"] = new $.gQ.Animation({imageURL: "enemy_missile.png", numberOfFrame: 6, delta: 15, rate: 90, type: $.gQ.ANIMATION_VERTICAL});
		// missile["playerexplode"] = new $.gQ.Animation({imageURL: "player_missile_explode.png" , numberOfFrame: 8, delta: 23, rate: 90, type: $.gQ.ANIMATION_VERTICAL | $.gQ.ANIMATION_CALLBACK});
		// missile["enemiesexplode"] = new $.gQ.Animation({imageURL: "enemy_missile_explode.png" , numberOfFrame: 6, delta: 15, rate: 90, type: $.gQ.ANIMATION_VERTICAL | $.gQ.ANIMATION_CALLBACK});
	
	// Initialize the game:
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});
				
	// Initialize the background
	$.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
						.addSprite("background1", {animation: background1, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
						.addSprite("background2", {animation: background2, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, posx: PLAYGROUND_WIDTH})
					.end()
					.addGroup("actors", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
					  .addGroup("crowd", {width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT})
					  .addGroup("interactables",{width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
						.addGroup("player", {posx: PLAYGROUND_WIDTH/2, posy: PLAYGROUND_HEIGHT - 120, width: 100, height: 100})
							.addSprite("playerBody",{animation: playerAnimation["idle-forward"], posx: 0, posy: 0, width: 100, height: 100})
						.end()
					.end()
					.addGroup("overlay",{width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});
	
	$("#player")[0].player = new Player($("#player"));

  // Generate the crowd NPCs
  if (crowdOn) {
  	$("#crowd")[0].crowd = new Crowd($("#crowd"));
    var px = -1 * Math.floor((Math.random() * PLAYGROUND_WIDTH) + 1); // \start the crowd off-screen
    var npcCount = Math.floor((Math.random() * 4) + 1) + 1;
    for (var i = 0; i < npcCount; i++) {
      var name = 'npc' + i;
      var w = 60;
      var h = 60;
      var offset = Math.floor((Math.random() * 100) + 1) - 50;
      $("#crowd").addSprite(name, 
        {animation: new $.gQ.Animation({imageURL: "images/npc.png", numberOfFrame: 1, delta: 52, rate: 60, type: $.gQ.ANIMATION_VERTICAL}), 
        posx: px + offset, posy: PLAYGROUND_HEIGHT - 120, width: w, height: h});
            $('#' + name).addClass('npc');
      $('#' + name)[0].npc = new NPC($('#' + name));
      $('#crowd')[0].crowd.add($('#' + name)[0].npc);
    }
  }

	//this is the HUD for the player life and suspicion
	$("#overlay").append("<div id='suspicionHUD'style='color: black; width: 100px; position: absolute; left: 0px; font-family: verdana, sans-serif;'></div><div id='timerHUD'style='color: black; width: 100px; position: absolute; right: 0px; font-family: verdana, sans-serif;'></div>")
	
	// this sets the id of the loading bar:
	$.loadCallback(function(percent){
		//$("#loadingBar").width(400*percent);
	});
	
	//initialize the start button
	$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
		});
	})
	
	// this is the function that control most of the game logic 
	$.playground().registerCallback(function(){
		if(!gameOver){
			$("#suspicionHUD").html("suspicion: "+$("#player")[0].player.suspicion);
			$("#lifeHUD").html("life: "+$("#player")[0].player.replay);
			$("#timerHUD").html("time: "+$("#player")[0].player.timer);
			//Update the movement of the ship:
			
			$("#player")[0].player.update();

			if ($('#player').x() >= 450 && $("#player")[0].player.speed > 0){
				var newPos = ($("#background1").x() - $("#player")[0].player.speed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
				$("#background1").x(newPos);
				
				newPos = ($("#background2").x() - $("#player")[0].player.speed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
				$("#background2").x(newPos);

				$('.npc').each(function() {	
	            	$(this).x(($(this).x() - $("#player")[0].player.speed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH);
	        	});
			} else {

				var nextpos = $("#player").x() + $("#player")[0].player.speed;
				if(nextpos > 0){
					$("#player").x(nextpos);
				}
			}

			$("#player")[0].player.friction();

			if(jQuery.gameQuery.keyTracker[65]){ //this is left! (a)

			}
			if(jQuery.gameQuery.keyTracker[68]){ //this is right! (d)

			}
			
			// //Update the movement of the enemies
				// $(".enemy").each(function(){
				// 		this.enemy.update($("#player"));
				// 		var posx = $(this).x();
				// 		if((posx + 100) < 0){
				// 			$(this).remove();
				// 			return;
				// 		}
				// 		//Test for collisions
				// 		var collided = $(this).collision("#playerBody,."+$.gQ.groupCssClass);
				// 		if(collided.length > 0){
				// 			if(this.enemy instanceof Bossy){
				// 					$(this).setAnimation(enemies[2]["explode"], function(node){$(node).remove();});
				// 					$(this).css("width", 150);
				// 			} else if(this.enemy instanceof Brainy) {
				// 				$(this).setAnimation(enemies[1]["explode"], function(node){$(node).remove();});
				// 				$(this).css("width", 150);
				// 			} else {
				// 				$(this).setAnimation(enemies[0]["explode"], function(node){$(node).remove();});
				// 				$(this).css("width", 200);
				// 			}
				// 			$(this).removeClass("enemy");
				// 			//The player has been hit!
				// 			if($("#player")[0].player.damage()){
				// 				//explodePlayer($("#player"));
				// 			}
				// 		}
				// 		//Make the enemy fire
				// 		if(this.enemy instanceof Brainy){
				// 			if(Math.random() < 0.05){
				// 				var enemyposx = $(this).x();
				// 				var enemyposy = $(this).y();
				// 				var name = "enemiesMissile_"+Math.ceil(Math.random()*1000);
				// 				$("#enemiesMissileLayer").addSprite(name,{animation: missile["enemies"], posx: enemyposx, posy: enemyposy + 20, width: 30,height: 15});
				// 				$("#"+name).addClass("enemiesMissiles");
				// 			}
				// 		}
				// 	});
				//Update the movement of the missiles
				// $(".playerMissiles").each(function(){
				// 		var posx = $(this).x();
				// 		if(posx > PLAYGROUND_WIDTH){
				// 			$(this).remove();
				// 			return;
				// 		}
				// 		$(this).x(MISSILE_SPEED, true);
				// 		//Test for collisions
				// 		var collided = $(this).collision(".enemy,."+$.gQ.groupCssClass);
				// 		if(collided.length > 0){
				// 			//An enemy has been hit!
				// 			collided.each(function(){
				// 					if($(this)[0].enemy.damage()){
				// 						if(this.enemy instanceof Bossy){
				// 								$(this).setAnimation(enemies[2]["explode"], function(node){$(node).remove();});
				// 								$(this).css("width", 150);
				// 						} else if(this.enemy instanceof Brainy) {
				// 							$(this).setAnimation(enemies[1]["explode"], function(node){$(node).remove();});
				// 							$(this).css("width", 150);
				// 						} else {
				// 							$(this).setAnimation(enemies[0]["explode"], function(node){$(node).remove();});
				// 							$(this).css("width", 200);
				// 						}
				// 						$(this).removeClass("enemy");
				// 					}
				// 				})
				// 			$(this).setAnimation(missile["playerexplode"], function(node){$(node).remove();});
				// 			$(this).css("width", 38);
				// 			$(this).css("height", 23);
				// 			$(this).y(-7, true);
				// 			$(this).removeClass("playerMissiles");
				// 		}
				// 	});
				// $(".enemiesMissiles").each(function(){
				// 		var posx = $(this).x();
				// 		if(posx < 0){
				// 			$(this).remove();
				// 			return;
				// 		}
				// 		$(this).x(-MISSILE_SPEED, true);
				// 		//Test for collisions
				// 		var collided = $(this).collision("#playerBody,."+$.gQ.groupCssClass);
				// 		if(collided.length > 0){
				// 			//The player has been hit!
				// 			collided.each(function(){
				// 					if($("#player")[0].player.damage()){
				// 						//explodePlayer($("#player"));
				// 					}
				// 				})
				// 			//$(this).remove();
				// 			$(this).setAnimation(missile["enemiesexplode"], function(node){$(node).remove();});
				// 			$(this).removeClass("enemiesMissiles");
				// 		}
				// 	});
		}
	}, REFRESH_RATE);
	
	//This function manage the creation of the enemies
		// $.playground().registerCallback(function(){
		// 	if(!bossMode && !gameOver){
		// 		if(Math.random() < 0.4){
		// 			var name = "enemy1_"+Math.ceil(Math.random()*1000);
		// 			$("#actors").addSprite(name, {animation: enemies[0]["idle"], posx: PLAYGROUND_WIDTH, posy: Math.random()*PLAYGROUND_HEIGHT,width: 150, height: 52});
		// 			$("#"+name).addClass("enemy");
		// 			$("#"+name)[0].enemy = new Minion($("#"+name));
		// 		} else if (Math.random() < 0.5){
		// 			var name = "enemy1_"+Math.ceil(Math.random()*1000);
		// 			$("#actors").addSprite(name, {animation: enemies[1]["idle"], posx: PLAYGROUND_WIDTH, posy: Math.random()*PLAYGROUND_HEIGHT,width: 100, height: 42});
		// 			$("#"+name).addClass("enemy");
		// 			$("#"+name)[0].enemy = new Brainy($("#"+name));
		// 		} else if(Math.random() > 0.8){
		// 			bossMode = true;
		// 			bossName = "enemy1_"+Math.ceil(Math.random()*1000);
		// 			$("#actors").addSprite(bossName, {animation: enemies[2]["idle"], posx: PLAYGROUND_WIDTH, posy: Math.random()*PLAYGROUND_HEIGHT,width: 100, height: 100});
		// 			$("#"+bossName).addClass("enemy");
		// 			$("#"+bossName)[0].enemy = new Bossy($("#"+bossName));
		// 		}
		// 	} else {
		// 		if($("#"+bossName).length == 0){
		// 			bossMode = false;
		// 		}
		// 	}
			
		// }, 1000); //once per seconds is enough for this 
	
	//this is where the keybinding occurs
	$(document).keydown(function(e){
		$('#player')[0].player.keydown(e.keyCode);
	});
	//this is where the keybinding occurs
	$(document).keyup(function(e){
		$('#player')[0].player.keyup(e.keyCode);
	});
});

