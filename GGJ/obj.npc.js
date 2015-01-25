function NPC(node) {
  this.node = $(node);

  // updates the position of the enemy
  this.updateX = function(npcNode){
    var shift = Math.floor((Math.random() * 2) + 1) - 1;
    this.node.x(shift, true);
  };  
}