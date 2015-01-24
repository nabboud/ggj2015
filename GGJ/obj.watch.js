var ONE_MIN = 120000;
function Watch(node) {

this.node = node;
this.timeOutput = 58;

this.start = function(){
	this.startDate = new Date();
};

this.updateTimer = function(){
	var tempDate = new Date();
	var diff = +tempDate - +this.startDate;

	var seconds = (diff/1000).toFixed(0) + '';
	seconds = (seconds.length == 1) ? '0' + seconds : seconds;

	if (seconds > 59){
		this.startDate = new Date();
		if (this.timeOutput = 50){
			gameOver = true;
			console.log('gameover');
		}
		this.timeOutput = 59;
	}

	$('#timerHUD').html('7:' + this.timeOutput + ':' + seconds);

};

return true;

}