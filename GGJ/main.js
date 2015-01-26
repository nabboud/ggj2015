// Global constants:
var PLAYGROUND_WIDTH	= 800;
var PLAYGROUND_HEIGHT	= 400;
var REFRESH_RATE		= 15;

var GRACE		= 2000;

/*Constants for the gameplay*/
var smallStarSpeed    	= 1 //pixels per frame

// Gloabl animation holder
var playerAnimation = new Array();

// Game state
var timeOfRespawn = 0;
var gameOver = false;
var crowdOn = true; // include the crowd in the game
var distanceTraved = 0;
var gameDistance = 100000;

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
	playerAnimation["idle-forward"]	 = new $.gQ.Animation({imageURL: "images/player-walk-forward.png"});
	playerAnimation["idle-backward"] = new $.gQ.Animation({imageURL: "images/player-walk-backward.png"});

	playerAnimation["walk-forward"]	 = new $.gQ.Animation({imageURL: "images/player-walk-forward.png" , numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});
	playerAnimation["walk-backward"] = new $.gQ.Animation({imageURL: "images/player-walk-backward.png", numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});

	playerAnimation["run-forward"]	 = new $.gQ.Animation({imageURL: "images/player-run-forward.png" , numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});
	playerAnimation["run-backward"]	 = new $.gQ.Animation({imageURL: "images/player-run-backward.png", numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});
	
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
						.addGroup("player", {posx: PLAYGROUND_WIDTH/2, posy: PLAYGROUND_HEIGHT - 170, width: 60, height: 100})
							.addSprite("playerBody",{animation: playerAnimation["idle-forward"], posx: 0, posy: 0, width: 60, height: 100})
						.end()
					.end()
					.addGroup("overlay",{width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});
	
	$("#player")[0].player = new Player($("#player"));
	


  // Generate the crowd NPCs
  var newCrowd = function(px) {
   	$('.npc').each(function() { $(this).remove(); }); // clear out old NPCs
  	$("#crowd")[0].crowd = new Crowd($("#crowd"));
    var npcCount = Math.floor((Math.random() * 4) + 1) + 1;
    for (var i = 0; i < npcCount; i++) {
      var name = 'npc' + i;
      var w = 60;
      var h = 100;
      px += Math.floor(Math.random() * 30) + 30;
      $("#crowd").addSprite(name);
      $('#' + name)[0].npc = new NPC($('#' + name), px);
      $('#' + name).setAnimation($('#' + name)[0].npc.spriteAnimation);
      $('#crowd')[0].crowd.add($('#' + name)[0].npc);
    }
  }
  if (crowdOn) {
    var px = PLAYGROUND_WIDTH / 2;
  	newCrowd(-1*px);
  }

	//this is the HUD for the player life and suspicion
	$("#overlay").append("<div id='suspicionHUD'style='color: black; width: 150px; position: absolute; left: 0px; font-family: verdana, sans-serif;'></div><div id='speedHUD'style='color: black; width: 250px; position: absolute; left: 160px; font-family: verdana, sans-serif;'></div><div id='timerHUD'style='color: black; width: 100px; position: absolute; right: 0px; font-family: verdana, sans-serif;'></div>")
	$("#timerHUD")[0].watch = new Watch($("#timerHUD"));
	// this sets the id of the loading bar:
	$.loadCallback(function(percent){
		//$("#loadingBar").width(400*percent);
	});
	
	//initialize the start button
	$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0,function(){$(this).remove();});
		});
		$("#timerHUD")[0].watch.start();
	})
	
	// this is the function that control most of the game logic 
	$.playground().registerCallback(function(){
		if(!gameOver){
			if ($('#crowd')[0].crowd) {
		        var s = $('#crowd')[0].crowd.increasePlayerSuspsicion($('#player')[0].player);
		        $('#player')[0].player.increaseSuspicion(s);
		    }

			$("#suspicionHUD").html("suspicion: "+$("#player")[0].player.suspicion);
			$("#speedHUD").html("speed: " + ($("#player")[0].player.speed).toFixed(2));
 			$('#timerHUD')[0].watch.updateTimer();
			
			//Update the movement of the ship:
			
			$("#player")[0].player.update();

			if ($('#player').x() >= 300 && $("#player")[0].player.speed > 0){
				var newPos = ($("#background1").x() - $("#player")[0].player.speed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
				$("#background1").x(newPos);
				
				newPos = ($("#background2").x() - $("#player")[0].player.speed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
				$("#background2").x(newPos);

      			if ($('#crowd')[0].crowd && $('#crowd')[0].crowd.upperX() < 0) {
      				var chance = Math.floor(Math.random() * 20) % 20;
	      			if (chance == 0) {
	      				newCrowd(PLAYGROUND_WIDTH + 200);
	      			}
      			}
      			else {
					$('.npc').each(function() {	
	          			$(this).x(($(this).x() - $("#player")[0].player.speed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH);
	      			});
      			}
			} else {
				var nextpos = $("#player").x() + $("#player")[0].player.speed;
				if(nextpos > 0){
					$("#player").x(nextpos);
				}
			}

			if(jQuery.gameQuery.keyTracker[65]){ //this is left! (a)

			}
			if(jQuery.gameQuery.keyTracker[68]){ //this is right! (d)

			}
		} else {
			restartgame();
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

