window.board = {
	element: null,
	width: null,
	height: null,
	grid: null,

	load: function(element, width, height) {

		this.element = element;
		this.width   = width;
		this.height  = height;

		this.grid=[];
		for (let y=0; y<this.height; y++) {
			let row = document.createElement('div');
			element.appendChild(row);
			for (let x=0; x<this.width;x++) {
				let cell = document.createElement('span');
				row.appendChild(cell);
			}
		}
	},
}