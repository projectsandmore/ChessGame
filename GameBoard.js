

class GameBoard {

    constructor() {
        this.board = [];
        this.PieceHint = [[]];
        this.hover = [];
        this.selectedPiece = false;
        this.Moves = [
            ["pawn",[[0,1],[0,2]]],
            ["knight",[[1,2],[-1,2],[1,-2],[-1,-2]]],
            ["rook",[[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],
            [-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0],
            [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
                [0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]]],
            ["bishop",[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],
            [1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],
                [-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7],
                [-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7]]],
            ["queen",[[1,1],[2,2],[3,3],[4,4],[5,5],[6,6],[7,7],
                [1,-1],[2,-2],[3,-3],[4,-4],[5,-5],[6,-6],[7,-7],
                [-1,-1],[-2,-2],[-3,-3],[-4,-4],[-5,-5],[-6,-6],[-7,-7],
                [-1,1],[-2,2],[-3,3],[-4,4],[-5,5],[-6,6],[-7,7],
                [1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],
                [-1,0],[-2,0],[-3,0],[-4,0],[-5,0],[-6,0],[-7,0],
                [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],
                [0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]
            ]],
            ["king",[[1,0],[-1,0],[0,1],[0,-1],[-1,-1],[-1,1],[1,-1],[1,1]]]
        ]


        this.piecies = ["pawn","rook","knight","bishop","queen","king"];
        this.Turn = "white";


    }

    MakeMove(player){
        if(this.selectedPiece !== false){
            console.log("")
            var xpos = this.selectedPiece[0];
            var ypos = this.selectedPiece[1];
            //Check for empty board
            if((this.board[this.hover[1]][this.hover[0]] == false && this.isFound2d(this.PieceHint, this.hover) == true) ||
                (this.board[this.hover[1]][this.hover[0][1]] != this.Turn && this.isFound2d(this.PieceHint, this.hover) == true)
            ){

                this.board[this.hover[1]][this.hover[0]] = [this.board[ypos][xpos][0],player]
                this.board[ypos][xpos] = false;

                this.PieceHint = [[]];
                console.log(this.Turn)
                if(this.Turn == "white"){
                    this.Turn = "black"
                }else{
                    this.Turn = "white"
                }
                console.log(this.Turn)
            }
                this.PieceHint = [[]];
        }

    }

    loadGameBoard(player1,player2){
        let board = [];
        var row = [];
        for(var sizeX=0; sizeX< 8; sizeX++){
            row = [];
            for(var sizeY=0; sizeY< 8; sizeY++) {
                row.push(false)
            }
            board.push(row)
        }

        for(let piece of player1){
            board[piece[2][1]][piece[2][0]] = [piece[0],"white"]
        }
        for(let piece of player2){
            board[piece[2][1]][piece[2][0]] = [piece[0],"black"]
        }
        this.board = board;

    }


    isFound(array, ele){
        for(var i=0; i<array.length; i++){
            if(array[i] == ele){
                return(true);
            }
        }
        return(false);


    }

    isFound2d(array, ele){
        for(var i=0; i<array.length; i++){
            if(array[i][0] == ele[0] && array[i][1] == ele[1]){
                return(true);
            }
        }
        return(false);


    }

    DisplayHint(pieceName,Position){
        var displayHints = [];

        for(var mov of this.Moves){
            if(mov[0] == pieceName){
                var moves_ = mov[1];
                var posX, posY;
                var obstaclesReach = [];
                for(var moveHints of moves_){
                    let moveHint = [...moveHints];
                    if(this.Turn == "black"){
                        moveHint[1] = -moveHint[1]
                    }
                    console.log(moveHint[1],this.Turn)
                    posX = Position[0] + moveHint[0];
                    posY = Position[1] + moveHint[1];

                    var Direction = "";
                    if(moveHint[0] > 0){
                        Direction += "R"
                    }
                    if(moveHint[0] < 0){
                        Direction += "L"
                    }
                    if(moveHint[1] > 0){
                        Direction += "D"
                    }
                    if(moveHint[1] < 0){
                        Direction += "U"
                    }


                    console.log(posX,posY)
                    if(posX >= 0 && posX <= 7 && posY >= 0 && posY <= 7) {

                        if (pieceName != "pawn" && this.board[posY][posX][1] != this.Turn && this.isFound(obstaclesReach,Direction) == false &&
                            this.board[posY][posX] != false){
                            displayHints.push([posX,posY]);
                            obstaclesReach.push(Direction);
                        }

                        if(pieceName == "pawn"){
                            if(this.board[posY][posX+1][1] != this.Turn && this.board[posY][posX+1] != false){
                                displayHints.push([posX+1,posY]);
                            }
                            if(this.board[posY][posX-1][1] != this.Turn && this.board[posY][posX-1] != false){
                                displayHints.push([posX-1,posY]);
                            }

                        }


                        if (this.board[posY][posX] == false && this.isFound(obstaclesReach,Direction) == false) {
                            displayHints.push([posX,posY]);
                        } else {
                            console.log(1234)
                            obstaclesReach.push(Direction);
                            this.PieceHint = displayHints;
                        }
                    }else{
                        continue;
                    }
                }

            }
        }
        this.PieceHint = displayHints;

    }

}

export default GameBoard



