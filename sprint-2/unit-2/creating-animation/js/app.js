window.board = {
	element: null,
	width: null,
	height:null,
	board:null,
	x:0,
	y:0,

	load: function(element, width, height) {

		this.element = element;
		this.width=width;
		this.height=height;

		this.board = [];
		for (y=0;y<this.height;y++){	
			this.board[y]=[];
			let row = document.createElement('div');
			row.className = 'row';
			for (x=0;x<this.width;x++) {
				let cell = document.createElement('div');
				cell.className = 'cell';
				this.board[y][x] = cell;
				row.appendChild(cell);
			}
			element.appendChild(row);
		}
		this.move(0,0);
	},

	move: function(deltaX,deltaY) {
		this.board[this.y][this.x].classList.remove('selected');

		let newX = this.x + deltaX;
		if ( newX>=0 && newX< this.width ){
			this.x=newX;
		}

		let newY = this.y + deltaY;
		if ( newY>=0 && newY< this.height ){
			this.y=newY;
		}

		this.board[this.y][this.x].classList.add('selected');
	}
}

