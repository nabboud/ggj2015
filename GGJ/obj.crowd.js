var CROWD_NPC_LIMIT = 5;

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

  this.lowerX = function() {
    var x;
    for (i = 0; i < this.npcs.length; i++) {
      if (!x || this.npcs[i].node.x() < x)
        x = this.npcs[i].node.x();
    }
    return x;
  }

  this.upperX = function() {
    var x;
    for (i = 0; i < this.npcs.length; i++) {
      if (!x || this.npcs[i].node.x() > x)
        x = this.npcs[i].node.x();
    }
    return x;
  }
}