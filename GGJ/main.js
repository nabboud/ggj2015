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
var gameDistance = 50000;

// Some hellper functions : 

// Function to restart the game:
function restartgame(){
	$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0);
			$("#timerHUD")[0].watch.start();
		});
	});
	window.location.reload();
};


// Mobile


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
						.addGroup("player", {posx: 100, posy: PLAYGROUND_HEIGHT - 170, width: 60, height: 100})
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
	$("#overlay").append("\
		<div id='suspicionHUD'style='color: black; width: 150px; position: absolute; left: 0px; font-family: verdana, sans-serif;'> \
		</div> \
		<div id='speedHUD'style='color: black; width: 250px; position: absolute; left: 160px; font-family: verdana, sans-serif;'> \
		</div> \
		<div id='distanceHUD'style='color: black; width: 100px; position: absolute; left: 320px; font-family: verdana, sans-serif;'> \
		</div> \
		<div id='timerHUD'style='color: cyan; background: black; position: absolute; right: 0px; font-family: verdana, sans-serif;'> \
		</div>");

	$("#timerHUD")[0].watch = new Watch($("#timerHUD"));
	// this sets the id of the loading bar:
	$.loadCallback(function(percent){
		//$("#loadingBar").width(400*percent);
	});
	
	//initialize the start button
	$("#startbutton").click(function(){
		$.playground().startGame(function(){
			$("#welcomeScreen").fadeTo(1000,0);
			$("#timerHUD")[0].watch.start();
		});
	});
	
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

			if ($('#player').x() >= 200 && $("#player")[0].player.speed > 0){
				var newPos = ($("#background1").x() - $("#player")[0].player.speed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
				$("#background1").x(newPos);
				
				newPos = ($("#background2").x() - $("#player")[0].player.speed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
				$("#background2").x(newPos);

				distanceTraved += $("#player")[0].player.speed;

  			if ($('#crowd')[0].crowd && $('#crowd')[0].crowd.upperX() < 0) {
  				$('#crowd')[0].crowd = null;
  			}
  			else if (!$('#crowd')[0].crowd) {
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

			if (distanceTraved >= gameDistance){
				gameover = true;
			}
			$('#distanceHUD').html(((distanceTraved/gameDistance)*100).toFixed(3) + '%');

		} else {
			if (distanceTraved >= gameDistance){

				$("#startbutton")
					.html('Replay')
					.click(function(){
						restartgame();
					});
				$("#welcomeScreen")
					.attr('style', 'width: 800px; height: 400px; position: absolute; z-index: 100; background-image: url(images/happyending.png); font-family: verdana, sans-serif;')
					.fadeTo(1000, 1);

			} else {
				$("#startbutton")
					.html('Replay')
					.click(function(){
						restartgame();
					});
				$("#welcomeScreen")
					.attr('style', 'width: 800px; height: 400px; position: absolute; z-index: 100; background-image: url(images/gameover.png); font-family: verdana, sans-serif;')
					.fadeTo(1000, 1);
			}
		}
	}, REFRESH_RATE);
	
	//this is where the keybinding occurs
	$(document).keydown(function(e){
		$('#player')[0].player.keydown(e.keyCode);
	});
	//this is where the keybinding occurs
	$(document).keyup(function(e){
		$('#player')[0].player.keyup(e.keyCode);
	});
});

