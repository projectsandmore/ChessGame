import Player from './Player.js';
import GameBoard from './GameBoard.js';
import Draw from './Draw.js';


var canvas = document.getElementById("canvasDiv");
var context = canvas.getContext("2d");

 // ["pawnName","white"]
var Turn = 1;

var player = new Player();
var gameBoard = new GameBoard();
gameBoard.loadGameBoard(player.Player1,player.Player2);

var draw = new Draw(context, gameBoard);


function findIn2D(array,val){
    for(var el = 0; el< array.length; el++){


    }
    return(-1);
}






document.addEventListener("mousemove", function(event){
    var x = event.clientX;
    var y = event.clientY;


    var rect = canvas.getBoundingClientRect();
    if(x-rect.x <= 800 && y-rect.y <= 800) {
        var mouse_positionX = Math.floor((x - rect.x) / 100);
        var mouse_positionY = Math.floor((y - rect.y) / 100);
        var hover = [mouse_positionX, mouse_positionY];
        gameBoard.hover = hover;



        draw.reloadBoard(gameBoard)
        draw.Board();
        draw.drawSelected();
        draw.drawPickedUP();

    }
})

document.addEventListener("mousedown", function(event){
    var x = event.clientX;
    var y = event.clientY;
    var rect = canvas.getBoundingClientRect();
    if(x-rect.x <= 800 && y-rect.y <= 800) {
        console.log(event);
        if (gameBoard.selectedPiece == false && gameBoard.board[gameBoard.hover[1]][gameBoard.hover[0]][1] == gameBoard.Turn) {
            gameBoard.selectedPiece = gameBoard.hover;
            //gameBoard.PieceHint = gameBoard.DisplayHint(gameBoard.board[gameBoard.hover[1]][gameBoard.hover[0]][0],gameBoard.hover);
            gameBoard.DisplayHint(gameBoard.board[gameBoard.hover[1]][gameBoard.hover[0]][0],gameBoard.hover)
            draw.reloadBoard(gameBoard)
            draw.Board();



        } else {
            gameBoard.MakeMove(gameBoard.Turn);
            gameBoard.selectedPiece = false;
            draw.reloadBoard(gameBoard)
            draw.Board();
        }

    }
})

document.addEventListener("mouseup", function(){

})

draw.Board();


