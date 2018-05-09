window.createBoard = function(element, width, height){
	
	let board = {
		element: element,
		width: width,
		height: height,
		grid: null
	}

	board.grid=[];
	for (let y=0; y<board.height; y++) {
		let row = document.createElement('div');
		element.appendChild(row);
		board.grid[y]=[]

		for (let x=0; x<board.width;x++) {
			let cell = document.createElement('span');
			row.appendChild(cell);
			board.grid[y][x]=cell;
		}
	}
	
	return board;
}

window.createPlayer = function(x, y, color, board) {
	
	let player = {
		x:x,
		y:y,
		color:color,
		board:board,
	}

	player.draw = function() {
		board.grid[this.y][this.x].className=this.color;
	}

	return player;
}