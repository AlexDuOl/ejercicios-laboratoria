window.onload = function() {
	let main = document.getElementsByTagName('main')[0];
	let board = createBoard(main, 60, 40);

	let player = createPlayer(Math.floor(board.width/2)+5,Math.floor(board.height/2),"blue",board);
	player.direction(1,0);

	let player2 = createPlayer(Math.floor(board.width/2)-5,Math.floor(board.height/2),"red",board);
	player2.direction(-1,0);

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
			case "w":
			player2.direction(0,-1);
			break;
			case "s":
			player2.direction(0,1);
			break;
			case "a":
			player2.direction(-1,0);
			break;
			case "d":
			player2.direction(1,0);
			break;
		}
	});

	let step = setInterval(function(){
		if (!player.move()) {
			clearInterval(step);
			alert("Crashed Blue!");
			location.reload();
		}
	},100);

	let step2 = setInterval(function(){
		if (!player2.move()) {
			clearInterval(step2);
			alert("Crashed Red!");
			location.reload();
		}
	},100);
};