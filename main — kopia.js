


var canvas = document.getElementById("canvasDiv");

var context = canvas.getContext("2d");

context.fillStyle = "rgb(255,0,0)";
context.fillRect(0,0,180,104);


var board = new Image();
board.src = "http://devd.io/chessGame/gameImages/board.png";

var piecies = ["pawn","rook","knight","bishop","queen","king"];
var Moves = [["pawn",[[0,1],[0,2]]],
    ["rook",[[1,2],[-1,2],[1,-2],[-1,-2]]],
]
var PieceHint = [[]];
var GameBoard = []; // ["pawnName","white"]
var Turn = 1;
var Player1 = [["rook",1,[0,0]],["knight",2,[1,0]],["bishop",3,[2,0]],["queen",4,[3,0]],["king",5,[4,0]],["bishop",3,[5,0]],["knight",2,[6,0]],["rook",1,[7,0]],
["pawn",0,[0,1]],["pawn",0,[1,1]],["pawn",0,[2,1]],["pawn",0,[3,1]],["pawn",0,[4,1]],["pawn",0,[5,1]],["pawn",0,[6,1]],["pawn",0,[7,1]]
];
var Player2 = [["rook",1,[0,7]],["knight",2,[1,7]],["bishop",3,[2,7]],["queen",4,[3,7]],["king",5,[4,7]],["bishop",3,[5,0]],["knight",2,[6,0]],["rook",1,[7,0]],
    ["pawn",0,[0,1]],["pawn",0,[1,1]],["pawn",0,[2,1]],["pawn",0,[3,1]],["pawn",0,[4,1]],["pawn",0,[5,1]],["pawn",0,[6,1]],["pawn",0,[7,1]]
];
var selectedPiece = false;
var hover = [];

GameBoard = loadGameBoard(GameBoard,Player1,Player2);

var images = loadPiecies(piecies);


function loadPiecies(piecies){
    var data = [];
    var types = ["white","black"];
    for(var type=0; type<types.length; type++) {
        for (piece in piecies) {
            var imgpics = new Image();
            if(type == 0) types = "white";
            if(type == 1) types = "black";
            var piecname = "chess-"+piecies[piece]+"-"+types;
            imgpics.src = "http://devd.io/chessGame/gameImages/" + piecname + ".png"
            data.push(imgpics);
        }
    }
    return(data);
}

function DrawPlayer(player,color){
        var color_ = 0;
        if(color == "black"){
            color_ = 6;
        }
        for(var x1=0; x1< 8; x1++){
            for(var y2 = 0; y2< 8; y2++){
                for(var x = 0; x< player.length; x++){
                    if(player[x][2][0] == x1 && player[x][2][1] == y2){
                        context.drawImage(images[player[x][1] + color_],100*x1,99*y2,110,110)
                    }
            }
        }
    }
}

function findPos(array,val){
    for(var element = 0; element< array.length; element ++){
        if(array[element] == val){
            return(element);
        }
    }
    return(-1);

}

function DrawBoard() {
    var color_ = 0;


    for (var x1 = 0; x1 < 8; x1++) {
        for (var y2 = 0; y2 < 8; y2++) {
            if (GameBoard[y2][x1] !== false) {
                color_ = 0;
                if (GameBoard[y2][x1][1] == "black") {
                    color_ = 6;
                }
                context.drawImage(images[findPos(piecies, GameBoard[y2][x1][0]) + color_], 100 * x1, 99 * y2, 110, 110)
            }

            //Display Hints
            for (var hint of PieceHint) {
                if(x1 == hint[0] && y2 == hint[1]){
                    context.strokeStyle = "rgb(55,250,10)"
                    context.lineWidth = 2;
                    context.strokeRect(100 * x1 + 1, 100 * y2, 100, 100)
                }
            }

        }
    }
}
function drawSelected(){

        for (var x1 = 0; x1 < 8; x1++) {
            for (var y2 = 0; y2 < 8; y2++) {
                if (hover[0] == x1 && hover[1] == y2) {
                    context.strokeStyle = "rgb(0,0,0)"
                    context.lineWidth = 2;
                    context.strokeRect(100 * x1 + 1, 100 * y2, 100, 100)
                }

            }

        }


}


function drawPickedUP(){
    if(selectedPiece !== false){
        var xpos = selectedPiece[0];
        var ypos = selectedPiece[1];
        var color_ = 0;
        if(GameBoard[ypos][xpos][1] == "black"){
            color_ = 6;
        }
        context.drawImage(images[findPos(piecies,GameBoard[ypos][xpos][0])+color_],100*hover[0],100*hover[1],100,100)
    }

}
function MakeMove(player,hover){
    if(selectedPiece !== false){
        console.log("")
        var xpos = selectedPiece[0];
        var ypos = selectedPiece[1];
        if(GameBoard[hover[1]][hover[0]] == false){
            GameBoard[hover[1]][hover[0]] = [GameBoard[ypos][xpos][0],player]
            GameBoard[ypos][xpos] == false;
        }
    }

}


function findIn2D(array,val){
    for(var el = 0; el< array.length; el++){


    }
    return(-1);
}


function DisplayHint(pieceName,Position){
    var displayHints = [];
    for(var mov of Moves){
        if(mov[0] == pieceName){
            var moves_ = mov[1];
            var posX, posY;
            for(var moveHint of moves_){
                posX = Position[0] + moveHint[0];
                posY = Position[1] + moveHint[1];
                if(posX > 0 && posX < 7 && posY > 0 && posY < 7) {
                    if (GameBoard[posY][posX] == false) {
                        displayHints.push([posX,posY]);
                    } else {
                        return (displayHints);
                    }
                }else{
                    continue;
                }
            }

        }
    }

    return(displayHints);

}

function loadGameBoard(board,player1,player2){
    board = [];
    var row = [];
    for(var sizeX=0; sizeX< 8; sizeX++){
        row = [];
        for(var sizeY=0; sizeY< 8; sizeY++) {
            row.push(false)
        }
        board.push(row)
    }

    for(piece of player1){
        board[piece[2][1]][piece[2][0]] = [piece[0],"white"]
    }
    for(piece of player2){
        board[piece[2][1]][piece[2][0]] = [piece[0],"black"]
    }
    return(board);

}

document.addEventListener("mousemove", function(event){
    var x = event.clientX;
    var y = event.clientY;


    var rect = canvas.getBoundingClientRect();
    if(x-rect.x <= 800 && y-rect.y <= 800) {
        var mouse_positionX = Math.floor((x - rect.x) / 100);
        var mouse_positionY = Math.floor((y - rect.y) / 100);
        hover = [mouse_positionX, mouse_positionY];

        context.drawImage(board, 0, 0, 800, 800);
        DrawBoard();
        drawSelected();
        drawPickedUP();

    }
})

document.addEventListener("mousedown", function(event){
    console.log(event);
    if(selectedPiece == false){
        selectedPiece = hover;
        PieceHint = DisplayHint(GameBoard[hover[1]][hover[0]][0],hover);
        DrawBoard();

    }else{
        MakeMove("white",hover);
        selectedPiece = false;
    }
})

document.addEventListener("mouseup", function(){

})

context.drawImage(board,0,0,800,800);


DrawBoard();


