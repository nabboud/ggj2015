var ONE_MIN = 120000;
function Watch(node) {

this.node = node;
this.timeOutput = 58;
this.first = 0;
this.start = function(){
	this.startDate = new Date();
};

this.updateTimer = function(){
	var tempDate = new Date();
	var diff = +tempDate - +this.startDate;
	console.log(diff);

	var seconds = (diff/1000).toFixed(0) + '';
	seconds = (seconds.length == 1) ? '0' + seconds : (seconds%60);

	if (diff/1000 > 60){
		this.startDate = new Date();
		this.timeOutput++;
		if(this.timeOutput == 60){
			gameOver = true;
		}
	}

	$('#timerHUD').html('7:' + this.timeOutput + ':' + seconds);

};

return true;

}