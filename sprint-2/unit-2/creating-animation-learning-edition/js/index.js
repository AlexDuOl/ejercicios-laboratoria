window.onload = function() {
	let main = document.getElementsByTagName('main')[0];
	let board = createBoard(main, 5, 5);

	let player=  createPlayer(2,2,"blue",board);
	player.draw();
	window.board=board;
	window.player=player;


	document.addEventListener('keypress', function(e){
		switch(e.key){
			case "ArrowUp":
			player.move(0,-1);
			break;
			case "ArrowDown":
			player.move(0,1);
			break;
			case "ArrowLeft":
			player.move(-1,0);
			break;
			case "ArrowRight":
			player.move(1,0);
			break;
		}
	});
};