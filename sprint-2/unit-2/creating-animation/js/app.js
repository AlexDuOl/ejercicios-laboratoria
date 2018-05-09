window.board = {
	element: null,
	width: null,
	height: null,
	grid: null,

	load: function(element, width, height) {

		this.element = element;
		this.width   = width;
		this.height  = height;

		this.grid = [];
		for (y=0;y<this.height;y++){	
			this.grid[y]=[];
			let row = document.createElement('div');
			row.className = 'row';
			for (x=0;x<this.width;x++) {
				let cell = document.createElement('div');
				cell.className = 'cell';
				this.grid[y][x] = cell;
				row.appendChild(cell);
			}
			element.appendChild(row);
		}
	},
}

window.player = {
	board: null,
	x: 0,
	y: 0,
	speedX: 0,
	speedY: 0,
	color: "",

	direction: function(speedX,speedY) {
		this.speedX = speedX;
		this.speedY = speedY;
	},

	move: function() {
		let newX = this.x + this.speedX;
		if ( newX>=0 && newX< this.board.width ){
			this.x=newX;
		} else {
			return false;
		}
		
		let newY = this.y + this.speedY;
		if ( newY>=0 && newY< this.board.height ){
			this.y=newY;
		} else {
			return false;
		}

		if( this.board.grid[this.y][this.x].classList.contains('blue')){
			return false;
		}

		if( this.board.grid[this.y][this.x].classList.contains('red')){
			return false;
		}
		console.log(this.color);
		console.log(this.x);
		this.board.grid[this.y][this.x].classList.add(this.color);
		return true;
	},
	
	load: function(board, x , y, color) {
		this.board = board;
		this.color = color;
		this.x = x;
		this.y = y;
	}
}