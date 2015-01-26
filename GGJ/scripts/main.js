// Global constants:
var PLAYGROUND_WIDTH	= 800;
var PLAYGROUND_HEIGHT	= 400;
var REFRESH_RATE		= 15;

// Gloabl animation holder
var playerAnimation = new Array();

// Game state
var timeOfRespawn = 0;
var onReplay = false;
var gameOver = false;
var buttonScreen = true;
var crowdOn = true; // include the crowd in the game
var distanceTraved = 0;
var gameDistance = 80000;
var music = {
	defeat: new $.gameQuery.SoundWrapper("sound/Defeat.mp3"),
	game: new $.gameQuery.SoundWrapper("sound/Overdrive.mp3"),
	victory: new $.gameQuery.SoundWrapper("sound/Victory.mp3"),
	credits: new $.gameQuery.SoundWrapper("sound/Lovesick.mp3"),
};
var sounds = {
	invisible: new $.gameQuery.SoundWrapper("sound/Invisible.mp3"),
	suspicion: new $.gameQuery.SoundWrapper("sound/Suspicion.mp3"),
	timer: new $.gameQuery.SoundWrapper("sound/Timer Beep.mp3"),
};
var openingCutscene = false;

// Function to restart the game:
function restartgame(){
	onReplay = true;
	$("#select-button").click(function(){
		$.playground().startGame(function(){
			setTimeout(function() { music.game.play(true); }, 2500); // in-game music
			buttonScreen = false;
			$("#welcomeScreen").fadeTo(1,0);
			$("#timerHUD")[0].watch.start();
		});
		$("#select-button").hide();
	});
	window.location.reload();
};

function setCookie(cname, cvalue, seconds) {
  var d = new Date();
  d.setTime(d.getTime() + (seconds*1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
} 

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
} 

// --------------------------------------------------------------------------------------------------------------------
// --                                      the main declaration:                                                     --
// --------------------------------------------------------------------------------------------------------------------
$(function(){

	// Animations declaration: 
	
	// The background:
	var background1 = new $.gQ.Animation({imageURL: "images/background/background1.png"});
	var background2 = new $.gQ.Animation({imageURL: "images/background/background2.png"});
 
	
	// Player space shipannimations:
	playerAnimation["idle-forward"]	 = new $.gQ.Animation({imageURL: "images/player/player-walk-forward.png"});
	playerAnimation["idle-backward"] = new $.gQ.Animation({imageURL: "images/player/player-walk-backward.png"});

	playerAnimation["walk-forward"]	 = new $.gQ.Animation({imageURL: "images/player/player-walk-forward.png" , numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});
	playerAnimation["walk-backward"] = new $.gQ.Animation({imageURL: "images/player/player-walk-backward.png", numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});

	playerAnimation["run-forward"]	 = new $.gQ.Animation({imageURL: "images/player/player-run-forward.png" , numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});
	playerAnimation["run-backward"]	 = new $.gQ.Animation({imageURL: "images/player/player-run-backward.png", numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});
	
	playerAnimation["idle-forward-invisible"]	 = new $.gQ.Animation({imageURL: "images/player/player-walk-forward-invisible.png"});
	playerAnimation["idle-backward-invisible"] = new $.gQ.Animation({imageURL: "images/player/player-walk-backward-invisible.png"});

	playerAnimation["walk-forward-invisible"]	 = new $.gQ.Animation({imageURL: "images/player/player-walk-forward-invisible.png" , numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});
	playerAnimation["walk-backward-invisible"] = new $.gQ.Animation({imageURL: "images/player/player-walk-backward-invisible.png", numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});

	playerAnimation["run-forward-invisible"]	 = new $.gQ.Animation({imageURL: "images/player/player-run-forward-invisible.png" , numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});
	playerAnimation["run-backward-invisible"]	 = new $.gQ.Animation({imageURL: "images/player/player-run-backward-invisible.png", numberOfFrame: 4, delta: 60, rate: 100, type: $.gQ.ANIMATION_HORIZONTAL});
	
	// Initialize the game:
	$("#playground").playground({height: PLAYGROUND_HEIGHT, width: PLAYGROUND_WIDTH, keyTracker: true});
				
	// Initialize the background
	$.playground().addGroup("background", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
						.addSprite("background1", {animation: background1, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
						.addSprite("background2", {animation: background2, width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT, posx: PLAYGROUND_WIDTH})
					.end()
					.addGroup("actors", {width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT})
					  	.addGroup("crowd", {width: PLAYGROUND_WIDTH, height:PLAYGROUND_HEIGHT})
					  	.end()
					  	.addGroup("player", {posx: 100, posy: PLAYGROUND_HEIGHT - 150, width: 60, height: 100})
							.addSprite("playerBody",{animation: playerAnimation["idle-forward"], posx: 0, posy: 0, width: 60, height: 100})
						.end()
					.end()
					.addGroup("overlay",{width: PLAYGROUND_WIDTH, height: PLAYGROUND_HEIGHT});
	
	$("#player")[0].player = new Player($("#player"));
	var inviscount = $("#player")[0].player.inviscount;

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
		<div id='distanceHUD'style='background: #00CC33; color: white; width: 70px; position: absolute; left: 320px; font-family: verdana, sans-serif; border: 2px solid white; padding: 4px; text-align: right;'> \
		</div> \
		<div id='invisibleBubHUD'style='width: 100px; position: absolute; left: 420px; height: 30px'> \
		</div> \
		<div id='timerHUD'style='color: cyan; background: black; position: absolute; right: 0px; font-family: verdana, sans-serif;'> \
		</div>");

	$("#timerHUD")[0].watch = new Watch($("#timerHUD"));
	// this sets the id of the loading bar:

	var invisiBubbleHTML = '';
	for (var i = 0; i < 3; i++){
		invisiBubbleHTML += '<img src="images/HUD/in.png">'; 
	}					
	$('#invisibleBubHUD').html(invisiBubbleHTML);

	$(".start").click(function(){
		if (!openingCutscene) {
			$('#background-audio').attr('autoplay', 'autoplay');
  		$('#welcome-screen').append('<img src="images/cutscene/opening.gif?' + (new Date()).getTime() + '" style="position:absolute;z-index:100;" />');
  		$(this).hide();
  		if (getCookie('openingCutscene') != '1') {
				setTimeout(function() {
					$("#go-button").show();
				}, 1);
				setCookie('openingCutscene', '1', 10*60);
			}
			else {
				$("#go-button").show();
			}
			openingCutscene = true;
		}
		else {
			$.playground().startGame(function(){
				setTimeout(function() { music.game.play(true); }, 1500); // in-game music
				buttonScreen = false;

				$("#welcome-screen img").remove();
				$("#welcome-screen").fadeTo(1,0);
				$("#timerHUD")[0].watch.start();
			});
			$(".start").hide();
		}
	});
	
	// this is the function that control most of the game logic 
	$.playground().registerCallback(function(){
		if(!gameOver){
			if ($('#crowd')[0].crowd) {
	        var s = $('#crowd')[0].crowd.increasePlayerSuspsicion($('#player')[0].player);
	        $('#player')[0].player.increaseSuspicion(s);
	        if (s > 0 && !$('#player')[0].player.invisstate) {
	        	sounds.suspicion.play();
	        }
	    }

	    if (inviscount != $("#player")[0].player.inviscount) {
	    	inviscount = $("#player")[0].player.inviscount;
	    	sounds.invisible.play();
	    }

			$("#suspicionHUD").html('<img src="images/HUD/susp-' + Math.min((Math.round($("#player")[0].player.suspicion/5) + 1), 5) + '.png"</img>');
			$("#speedHUD").html(($("#player")[0].player.speed).toFixed(0) + ' Paws/sec');
 			$('#timerHUD')[0].watch.updateTimer();
			
			//Update the movement of the ship:
			
			$("#player")[0].player.update();

			// if moving background
			if ($('#player').x() >= 200 && $("#player")[0].player.speed > 0){
				var newPos = ($("#background1").x() - $("#player")[0].player.speed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
				$("#background1").x(newPos);
				
				newPos = ($("#background2").x() - $("#player")[0].player.speed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH;
				$("#background2").x(newPos);

				distanceTraved += $("#player")[0].player.speed;

				// if crowd off screen
	  			if ($('#crowd')[0].crowd && $('#crowd')[0].crowd.upperX() < 0) {

	  				$('#crowd')[0].crowd = null;

	  			} else if (!$('#crowd')[0].crowd) {
	  				// if not croud, make a croud, maybe?
	  				var chance = Math.floor(Math.random() * 20) % 20;
	    			if (chance == 0) {
	    				newCrowd(PLAYGROUND_WIDTH + 200);
	    			}
	  			} else {
	  				// move the croud
					$('.npc').each(function() {
	        			$(this).x(($(this).x() - $("#player")[0].player.speed - PLAYGROUND_WIDTH) % (-2 * PLAYGROUND_WIDTH) + PLAYGROUND_WIDTH);
	    			});

	  			}
			} else {
				// move player
				var nextpos = $("#player").x() + $("#player")[0].player.speed;
				if(nextpos > 0){
					$("#player").x(nextpos);
				}
			}

			$('.npc').each(function() {	
				$(this)[0].npc.update();
			});			

			if(jQuery.gameQuery.keyTracker[65]){ //this is left! (a)

			}
			if(jQuery.gameQuery.keyTracker[68]){ //this is right! (d)

			}

			if (distanceTraved >= gameDistance){
				gameOver = true;
			}
			$('#distanceHUD').html(((distanceTraved/gameDistance)*61 + 1).toFixed(0) + ' St');

		} else if (gameOver && !buttonScreen){
			if (distanceTraved >= gameDistance){
				$("#select-button")
					.html('Replay')
					.removeClass('start retry replay')
					.addClass('replay')
					.show()
					.click(function(){
						restartgame();
					});
					buttonScreen = true;
				$("#welcome-screen")
					.attr('style', 'width: 800px; height: 400px; position: absolute; z-index: 100; background-image: url(images/cutscene/ending.gif); font-family: verdana, sans-serif;')
					.fadeTo(1000, 1);
				setTimeout(function() {
					music.game.stop();
					music.credits.play(true);
				}, 200);
			} else {
				$("#select-button")
					.html('Retry')
					.removeClass('start retry replay')
					.addClass('retry')
					.show()
					.click(function(){
						restartgame();
					});
					buttonScreen = true;
				$("#welcome-screen")
					.attr('style', 'width: 800px; height: 400px; position: absolute; z-index: 100; background-image: url(images/gameScreens/gameover.png); font-family: verdana, sans-serif;')
					.fadeTo(1000, 1);
				setTimeout(function() {
					music.game.stop();
					music.defeat.play(true);
				}, 200);
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

