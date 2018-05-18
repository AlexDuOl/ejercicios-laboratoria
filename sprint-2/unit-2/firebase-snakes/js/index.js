window.onload = function() {
	let colors= ['red','green', 'blue', 'pink', 'yellow', 'cyan'];
	colors.map( (color) => addOption(color) );
	
	let board = createBoard( document.getElementsByTagName('main')[0], 99, 70);
	window.selectedPlayer='';	
	
	// Initialize Firebase
	let config = {
		apiKey: "AIzaSyCVk927JYDHITwqQCJEIZa9PRgvQh0AlnU",
		authDomain: "lab-4af3a.firebaseapp.com",
		databaseURL: "https://lab-4af3a.firebaseio.com",
		projectId: "lab-4af3a",
		storageBucket: "lab-4af3a.appspot.com",
		messagingSenderId: "31504656641"
	};
	firebase.initializeApp(config);
	
	/* place to store all players to move them and stuff */
	window.players=[];
	
	/* Points to the database */
	let firebasePlayersRef = firebase.database().ref().child('players');
	
	/* When a player joins the game */
	firebasePlayersRef.on('child_added', function(snap){
		let values = snap.val();
		
		/* New player is created and inserted */
		players[snap.key] = createPlayer(values.x,values.y, values.color, board);
		
		/* The color is removed from the selectable colors */
		removeOption(values.color);
	});

	/* When a player changes their position */
	firebasePlayersRef.on('child_changed', function(snap) {
		let values = snap.val();
		/* We simply move it to the new position, set is absolute, no relative, as player.move */
		players[snap.key].set(values.x,values.y);
	});

	/* When a player leaves */
	firebasePlayersRef.on('child_removed', function(snap) {
		let values = snap.val();
		/* Erase it while the object still exists */
		players[snap.key].erase(values.x,values.y);
		/* We remove the object from existance */
		players.splice(snap.key,1);
		/* This color is available again to be chosen */
		addOption(values.color);
	});

	/* When the local player clicks join after selecting a valid color */
	document.getElementById('join-button').addEventListener('click', function() {
		/* Element that holds the selected color */
		let playerSelect = document.getElementById('player-select');
		
		/* We Create a new reference in the DB, and then insert the new data there */
		let newPlayerRef = firebasePlayersRef.push();
		newPlayerRef.set({
			color: playerSelect.value,
			x: getRandom(0,board.width),
			y: getRandom(0,board.height)
		});
		
		window.selectedPlayer = newPlayerRef.key;
	});
		
	window.addEventListener('keydown', function(e) {
		switch(e.key){
			case "ArrowUp":
			move(0,-1);
			break;
			case "ArrowDown":
			move(0,1);
			break;
			case "ArrowLeft":
			move(-1,0);
			break;
			case "ArrowRight":
			move(1,0);
			break;
		}
	});

	/* Moves local player move */
	function move(x,y){
		if (selectedPlayer!='') {
			/* first we make a local movement */
			players[selectedPlayer].move(x,y);
			
			/* then we update the db */
			let playerRef = firebasePlayersRef.child(selectedPlayer);
			playerRef.update({
				x: players[selectedPlayer].x,
				y: players[selectedPlayer].y
			});
		}
	}

	/* Adds and option to the players list */
	function addOption(color){
		let playerSelect = document.getElementById('player-select');
		let option = document.createElement('option');
		option.value=color;
		option.textContent=color;
		playerSelect.appendChild(option);
	};
	
	/* Removes and option from the players list */
	function removeOption(color){
		let playerSelect = document.getElementById('player-select');
		playerSelect.querySelector('[value='+color+']').remove();
	};
	
	/* Utiliy function that generates a random integer number in a range */
	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	
};
