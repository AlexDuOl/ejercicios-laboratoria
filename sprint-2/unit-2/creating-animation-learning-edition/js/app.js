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
		speedX:0,
		speedY:0,
	}

	player.draw = function() {
		this.board.grid[this.y][this.x].className = this.color;
	}
	
	player.erase = function() {
		this.board.grid[this.y][this.x].className = "";
	}
	
	player.direction = function(x,y) {
		this.speedX = x;
		this.speedY = y;
	}
	
	player.move = function() {
		let newX = this.x+this.speedX;
		if (newX<0 || newX>=this.board.width) {
			return false;
		}

		let newY = this.y+this.speedY;
		if (newY<0 || newY>=this.board.height) {
			return false;
		}
		
		if(this.board.grid[newY][newX].className!=="") {
			return false;
		}
		
		this.x += this.speedX;
		this.y += this.speedY;
		this.draw();
	
		return true;
	}

	return player;
}