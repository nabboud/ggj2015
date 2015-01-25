function NPC(node, x) {
  var NPC_SPRITE_WIDTH = 60;
  var NPC_SPRITE_HEIGHT = 150;
  var SPRITE_IMAGES = [
    {forward: "images/npc/npc1_forward.png", back: "images/npc/npc1_back.png"},
    {forward: "images/npc/npc2_forward.png", back: "images/npc/npc2_back.png"},
    {forward: "images/npc/npc3_forward.png", back: "images/npc/npc3_back.png"}
  ];

  this.node = $(node);
  this.node.addClass('npc');
  this.node.x(x);
  this.node.y(PLAYGROUND_HEIGHT - 215 + Math.random()*10);
  this.node.wh(NPC_SPRITE_WIDTH, NPC_SPRITE_HEIGHT);

  // Pick the active sprite image for the NPC
  this.spriteImageURL = function() {
    if (!this.forward)
      var url = SPRITE_IMAGES[this.spriteIndex].back;
    else
      var url = SPRITE_IMAGES[this.spriteIndex].forward;
    return url;
  }

  this.forward = Math.floor(Math.random() * 2) % 2 == 1 ? true : false;
  this.spriteIndex = Math.floor(Math.random() * SPRITE_IMAGES.length);
  this.spriteAnimation = new $.gQ.Animation({imageURL: this.spriteImageURL(), numberOfFrame: 1, delta: 52, rate: 60, type: $.gQ.ANIMATION_VERTICAL});

  // updates the position of the NPC
  this.updateX = function(npcNode){
    var shift = Math.floor((Math.random() * 2) + 1) - 1;
    this.node.x(shift, true);
  };

  this.spriteWidth = function() {
    return NPC_SPRITE_WIDTH;
  }

  this.spriteHeight = function() {
    return NPC_SPRITE_HEIGHT;
  }
}