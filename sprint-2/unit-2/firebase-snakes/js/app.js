window.createBoard = function(element, width, height) {
	let board = {
	element: element,
		width: width,
		height: height,
		grid: [],
	}

	for (y=0; y<board.height; y++) {
		let row = document.createElement('div');
		row.className='row';
		element.appendChild(row);
		board.grid[y] = [];

		for (x=0; x< board.width; x++){
			let cell = document.createElement('span');
			row.appendChild(cell);
			board.grid[y][x]=cell;
		}
	}

	return board;
}

window.createPlayer = function(x ,y, color, board) {

	let player = {
		x:x,
		y:y,
		color: color,
		board: board,
	}

	player.draw = function(){
		player.board.grid[player.y][player.x].id = player.color;
	}

	player.erase = function(){
		player.board.grid[player.y][player.x].id = "";
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

		if ( this.board.grid[newY][newX].id!== "") {
			return false;
		}

		player.set(newX,newY);
		return true;
	}
	
	player.set = function(x,y) {
		player.erase();
		player.x = x;
		player.y = y;
		player.draw();
	}
	
	player.draw();

	return player;
}	