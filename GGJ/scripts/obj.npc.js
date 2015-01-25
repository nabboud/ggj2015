function NPC(node, x) {
  var NPC_SPRITE_WIDTH = 60;
  var NPC_SPRITE_HEIGHT = 150;
  var SPRITE_IMAGES = {
    npc1: {
      forward: {
          normal: "images/npc/npc1_forward.png",
          e: "images/npc/npc1_forward_e.png",
          s: "images/npc/npc1_forward_s.png"
        },
      back: {
          normal: "images/npc/npc1_back.png",
          e: "images/npc/npc1_back_e.png",
          s: "images/npc/npc1_back_s.png"
        },        
      },
    npc2: {
      forward: {
          normal: "images/npc/npc2_forward.png",
          e: "images/npc/npc2_forward_e.png",
          s: "images/npc/npc2_forward_s.png"
        },
      back: {
          normal: "images/npc/npc2_back.png",
          e: "images/npc/npc2_back_e.png",
          s: "imges/npc/npc2_back_s.png"
        }
      },
    npc3: {
      forward: {
          normal: "images/npc/npc3_forward.png",
          e: "images/npc/npc3_forward_e.png",
          s: "images/npc/npc3_forward_s.png"
        },
      back: {
          normal: "images/npc/npc3_back.png",
          e: "images/npc/npc3_back_e.png",
          s: "imges/npc/npc3_back_s.png"
        }
      },
  };

  this.node = $(node);
  this.node.addClass('npc');
  this.node.x(x);
  this.node.y(PLAYGROUND_HEIGHT - 215 + Math.random()*10);
  this.node.wh(NPC_SPRITE_WIDTH, NPC_SPRITE_HEIGHT);

  // Pick the active sprite image for the NPC
  this.spriteImageURL = function() {
    console.log(this.spriteIndex);

    if (!this.forward)
      var url = SPRITE_IMAGES['npc' + this.spriteIndex].back.normal;
    else
      var url = SPRITE_IMAGES['npc'+ this.spriteIndex].forward.normal;
    return url;
  }

  this.forward = Math.floor(Math.random() * 2) % 2 == 1 ? true : false;
  this.spriteIndex = Math.floor(Math.random() * 3) + 1;
  this.spriteAnimation = new $.gQ.Animation({imageURL: this.spriteImageURL()});

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

  this.update = function() {
    console.log('NPC update');
  };

}