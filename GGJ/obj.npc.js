var NPC_SPRITE_WIDTH = 60;
var NPC_SPRITE_HEIGHT = 100;

function NPC(node, x) {
  this.node = $(node);
  this.node.addClass('npc');
  this.node.x(x);
  this.node.y(PLAYGROUND_HEIGHT - 120);
  this.node.wh(NPC_SPRITE_WIDTH, NPC_SPRITE_HEIGHT);

  this.spriteAnimation = new $.gQ.Animation({imageURL: "images/npc1_back.png", numberOfFrame: 1, delta: 52, rate: 60, type: $.gQ.ANIMATION_VERTICAL});

  // updates the position of the enemy
  this.updateX = function(npcNode){
    var shift = Math.floor((Math.random() * 2) + 1) - 1;
    this.node.x(shift, true);
  };  
}