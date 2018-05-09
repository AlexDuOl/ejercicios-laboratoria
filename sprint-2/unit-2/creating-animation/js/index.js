window.onload = function() {
  let main = document.getElementsByTagName('main')[0];
  
  board.load(main,95,49);


  let x=Math.floor(board.width/2);
  let y=Math.floor(board.height/2);
  player.load(board,x,y,"red");
  player.direction(-1,0);

  player2 = Object.assign({}, player);
  player2.color="blue";
  player2.x= x-3;
  player.direction(1,0);
  
  document.addEventListener('keypress', function(e){
    switch(e.key){
      case "ArrowUp":
      player.direction(0,-1);
      break;
      case "ArrowDown":
      player.direction(0,1);
      break;
      case "ArrowLeft":
      player.direction(-1,0);
      break;
      case "ArrowRight":
      player.direction(1,0);
      break;
      case "w":
      player2.direction(0,-1);
      break;
      case "s":
      player2.direction(0,1);
      break;
      case "a":
      player2.direction(-1,0);
      break;
      case "d":
      player2.direction(1,0);
      break;
    }
  });

  let tick1 = setInterval(function(){
    if ( !player.move() && (player.speedX!==0 || player.speedY!==0) ){
      clearInterval(tick2);
      clearInterval(tick1);
      alert('Red Lose!');
      location.reload();
    }
  },50);

  let tick2 = setInterval(function(){
    if ( !player2.move() && (player2.speedX!==0 || player2.speedY!==0) ){
      clearInterval(tick2);
      clearInterval(tick1);
      alert('Blue Lose!');
      location.reload();
    }
  },50);

};