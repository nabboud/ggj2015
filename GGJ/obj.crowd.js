var CROWD_NPC_LIMIT = 5;
var SUSPICION_RANGE = 100;
var SUSPICION_VELOCITY = 10;

function Crowd(node) {
  this.node = $(node);
  this.npcs = [];

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
      if (!x || this.npcs[i].node.x() > x)
        x = this.npcs[i].node.x();
    }
    return x;
  }

  // Determines how much to add to the player suspicion
  this.increasePlayerSuspsicion = function(player) {
    var s = 0;
    var speed = player.speed;
    var x = player.node.x();
    if (player.speed >= SUSPICION_VELOCITY) {
      s += 1;
    }
    if (x >= (this.lowerX() - SUSPICION_RANGE) && x <= (this.upperX() + SUSPICION_RANGE)) {
      s += 1;
    }
    return s;
  }
}