

function interactable(node, x) {
  this.node.ishidden = true
  this.node.hide();
 
  this.interactable = function() {
   
  this.update = function(){
    if (this.node.ishidden = true){
      this.spawn();
    }
    if (this.node.x() < (0 - this.node.width()){
      this.reset();
    }
  };

  this.spawn = function() {
    this.node.x(PLAY_GROUND_WIDTH);
    this.node.show();
  };

  this.reset = function() {
    this.node.hide();
    this.node.ishidden = false;
  };
}