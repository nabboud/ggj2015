function Crowd(node) {
  var CROWD_NPC_LIMIT = 5;
  var SUSPICION_RANGE = 200;
  var SUSPICION_VELOCITY = 20;
  var OUTRAGEOUS_VELOCITY = 50;

  this.node = $(node);
  this.npcs = [];
  this.noticedPlayer = false;

  // Returns the number of NPCs in the crowd
  this.count = function() {
  	return this.npcs.length;
  }

  // Adds an NPC to the crowd
  this.add = function(npc) {
    if (this.npcs.length >= CROWD_NPC_LIMIT)
      return false;
  	this.npcs.push(npc);
  }

  // Lower x bound of the NPCs
  this.lowerX = function() {
    var x;
    for (i = 0; i < this.npcs.length; i++) {
      if (!x || this.npcs[i].node.x() < x)
        x = this.npcs[i].node.x();
    }
    return x;
  }

  // Upper x bound of the NPCs
  this.upperX = function() {
    var x;
    for (i = 0; i < this.npcs.length; i++) {
      if (!x || (this.npcs[i].node.x() + this.npcs[i].spriteWidth()) > x)
        x = this.npcs[i].node.x() + this.npcs[i].spriteWidth();
    }
    return x;
  }

  // Determines how much to add to the player suspicion
  this.increasePlayerSuspsicion = function(player) {
    if (this.noticedPlayer)
      return 0;
    var s = 0;
    var speed = player.speed;
    var x = player.node.x();
    var tooFast = (player.speed >= SUSPICION_VELOCITY);
    var tooBloodyFast = tooFast && (player.speed >= OUTRAGEOUS_VELOCITY);
    var tooClose = (x >= (this.lowerX() - SUSPICION_RANGE) && x <= (this.upperX() + SUSPICION_RANGE));
    if (tooClose && tooFast) {
      var factor = tooBloodyFast ? 5 : 1;
      s += factor * 1;
      this.noticedPlayer = true;
    }
    return s;
  }
}