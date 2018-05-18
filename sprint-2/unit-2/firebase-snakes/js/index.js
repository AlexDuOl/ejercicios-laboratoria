window.onload = function() {
	let colors= ['black','red','green', 'blue', 'pink', 'yellow', 'cyan'];
	colors.map( (color) => addOption(color) );
	
	let board = createBoard( document.getElementsByTagName('main')[0], 60, 30);
	window.selectedPlayer='';	
	
	document.getElementById('name-input').focus();
	
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
		let newPlayer = snap.val();
		
		/* New player is created and inserted */
		players[snap.key] = createPlayer(newPlayer.name, newPlayer.x,newPlayer.y, newPlayer.color, board);
		
		/*We add player names in the bottom of the board */
		addPlayerName(newPlayer.name,newPlayer.color);
		
		/* The color is removed from the selectable colors */
		removeOption(newPlayer.color);
	});
	
	/* When a player changes their position */
	firebasePlayersRef.on('child_changed', function(snap) {
		let values = snap.val();
		/* We simply move it to the new position, set is absolute, no relative, as player.move */
		players[snap.key].set(values.x,values.y);
	});
	
	/* When a player leaves */
	firebasePlayersRef.on('child_removed', function(snap) {
		let oldPlayer = snap.val();
		/* Erase it while the object still exists */
		players[snap.key].erase(oldPlayer.x,oldPlayer.y);
		
		/* We remove the player from bottom of the board */
		removePlayerName(oldPlayer.color);
		
		/* We remove the object from existance */
		players.splice(snap.key,1);
		
		/* This color is available again to be chosen */
		addOption(oldPlayer.color);
	});
	
	/* When the local player clicks join after selecting a valid color */
	document.getElementById('join-button').addEventListener('click', function() {
		/* Element that holds the selected color */
		let color = document.getElementById('color-select').value;
		let name  = document.getElementById('name-input').value;
		
		if(name.length==0){alert("The username can't be empty");}
		
		/* We Create a new reference in the DB, and then insert the new data there */
		let newPlayerRef = firebasePlayersRef.push();
		newPlayerRef.set({
			color: color,
			x: getRandom(0,board.width),
			y: getRandom(0,board.height),
			name: name
		});
		
		document.getElementById('join-game-form').style.display="none";
		document.getElementById('leave-game-form').style.display="block";
		
		window.selectedPlayer = newPlayerRef.key;
	});
	
	document.getElementById('leave-button').addEventListener('click', function() {
		leaveGame();
	});

	onbeforeunload= function(){
		leaveGame();
	}
	
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
		let colorSelect = document.getElementById('color-select');
		let option = document.createElement('option');
		option.value=color;
		option.textContent=color;
		colorSelect.appendChild(option);
	};
	
	/* Removes and option from the players list */
	function removeOption(color){
		document.getElementById('color-select').querySelector('[value='+color+']').remove();
	};
	
	/* Utiliy function that generates a random integer number in a range */
	function getRandom(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	
	function addPlayerName(name, color) {
		let newPlayerElement = document.createElement('p');
		newPlayerElement.textContent = name;
		newPlayerElement.setAttribute('data-color', color);
		document.getElementById('players').appendChild(newPlayerElement);
	}
	
	function removePlayerName(color) {
		document.getElementById('players').querySelector('[data-color='+color+']').remove();
	}
	function leaveGame(){
		/* we remove the player*/
		let playerRef = firebasePlayersRef.child(selectedPlayer);
		playerRef.remove();
		selectedPlayer='';

		document.getElementById('join-game-form').style.display="block";
		document.getElementById('leave-game-form').style.display="none";
	}
	
};
