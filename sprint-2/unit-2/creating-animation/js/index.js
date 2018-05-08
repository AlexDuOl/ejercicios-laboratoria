window.onload = function() {
  let main = document.getElementsByTagName('main')[0];
  board.load(main,60,40);

  document.addEventListener('keypress', function(e){
    switch(e.keyCode){
      case 38:
      board.move(0,-1);
      break;
      case 40:
      board.move(0,1);
      break;
      case 39:
      board.move(1,0);
      break;
      case 37:
      board.move(-1,0);
      break;
    }
  });
};