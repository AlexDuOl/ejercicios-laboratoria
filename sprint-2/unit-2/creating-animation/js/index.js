window.onload = function() {
  let main = document.getElementsByTagName('main')[0];
  board.load(main,60,40);

  document.addEventListener('keypress', function(e){
    switch(e.keyCode){
      case 38:
      board.direction(0,-1);
      break;
      case 40:
      board.direction(0,1);
      break;
      case 39:
      board.direction(1,0);
      break;
      case 37:
      board.direction(-1,0);
      break;
    }
  });

  let tick = setInterval(function(){
    if ( !board.move() ){
      clearInterval(tick);
      alert('You Lose!');
    }
  },100);
};