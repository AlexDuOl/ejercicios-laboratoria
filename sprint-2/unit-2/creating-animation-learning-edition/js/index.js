window.onload = function() {
	let main = document.getElementsByTagName('main')[0];
	let board = createBoard(main, 30, 20);

	let player=  createPlayer(2,2,"blue",board);
	player.draw();
	player.direction(1,0);
	window.board=board;
	window.player=player;


	document.addEventListener('keypress', function(e){
		switch(e.key){
			case "ArrowUp":
			player.direction(0,-1);
			break;
			case "ArrowDown":
			player.direction(0,1);
			break;
			case "ArrowLeft":
			player.direction(-1,0);
			break;
			case "ArrowRight":
			player.direction(1,0);
			break;
		}
	});

	let step = setInterval(function(){
		if (!player.move()) {
			clearInterval(step);
			console.log('Crashed!');
		}
	},100);
};