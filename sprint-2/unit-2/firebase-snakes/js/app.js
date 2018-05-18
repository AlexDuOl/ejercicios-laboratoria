window.createBoard = function(element, width, height) {
	let board = {
	element: element,
		width: width,
		height: height,
		grill: [],
	}


	for (y=0; y<board.height; y++) {
		let row = document.createElement('div');
		row.className='row';
		element.appendChild(row);
		board.grill[y] = [];

		for (x=0; x< board.width; x++){
			let cell = document.createElement('span');
			row.appendChild(cell);
			board.grill[y][x]=cell;
		}
	}

	return board;
}

window.createPlayer = function(x ,y, directionX, directionY, color, board) {

	let player = {
		x:x,
		y:y,
		color: color,
		board: board,
		directionX: directionX,
		directionY: directionY
	}

	player.draw = function(){
		player.board.grill[player.y][player.x].className = player.color;
	}

	player.erase = function(){
		player.board.grill[player.y][player.x].className = "";
	}

	player.direction = function(x,y){
		player.directionX = x;
		player.directionY = y;
	}
	
	player.move = function(x,y) {

		let newX = player.x + x;
		let newY = player.y + y;

		if(newX >= player.board.width || newX<0) {
			return false;
		}

		if(newY >= player.board.height || newY<0) {
			return false;
		}

		if ( this.board.grill[newY][newX].className!== "") {
			return false;
		}
		player.erase();
		player.x = newX;
		player.y = newY;
		player.draw();

		return true;
	}
	
	player.draw();

	return player;
}	