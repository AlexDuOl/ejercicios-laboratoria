window.onload = function() {
	let colors= ['red','green', 'blue', 'pink', 'yellow', 'cyan'];
	
	let board = createBoard(
		document.getElementsByTagName('main')[0],
		99, 70
	);
	
	
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
	
	let players=[];
	let firebasePlayersRef = firebase.database().ref().child('players');
	
	firebasePlayersRef.on('child_added', function(snap){
		let values = snap.val();
		players[values.color] = createPlayer(values.x,values.y, values.color, board);
	});

	firebasePlayersRef.on('child_changed', function(snap){
		let values = snap.val();
		players[values.color].set(values.x,values.y);
	});

	firebasePlayersRef.on('child_removed', function(snap){
		let values = snap.val();
		players[values.color].erase(values.x,values.y);
		players.splice(values.color,1);
	});

	/* window.addEventListener('keypress', function(e) {
		switch(e.key){
			case "ArrowUp":
			player.move(0,-1);
			break;
			case "ArrowDown":
			player.move(0,1);
			break;
			case "ArrowLeft":
			player.move(-1,0);
			break;
			case "ArrowRight":
			player.move(1,0);
			break;
		}
		
	}); */
};