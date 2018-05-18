window.onload = function() {
	var board = createBoard(
		document.getElementsByTagName('main')[0],
		30, 20
	);

	let player1 = createPlayer(10, 5, -1, 0, "blue", board);
	let player2 = createPlayer(20, 5, 1, 0, "red", board);	

	window.addEventListener('keypress', function(e) {
		switch(e.key){
			case "w":
			player1.move(0,-1);
			break;
			case "s":
			player1.move(0,1);
			break;
			case "a":
			player1.move(-1,0);
			break;
			case "d":
			player1.move(1,0);
			break;
			case "ArrowUp":
			player2.move(0,-1);
			break;
			case "ArrowDown":
			player2.move(0,1);
			break;
			case "ArrowLeft":
				player2.move(-1,0);
			break;
			case "ArrowRight":
			player2.move(1,0);
			break;
		}

	});
};