

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
                [0,-1],[0,-2],[0,-3],[0,-4],[0,-5],[0,-6],[0,-7]]]
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
            if(this.board[this.hover[1]][this.hover[0]] == false){

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

    DisplayHint(pieceName,Position){
        var displayHints = [];
        console.log(pieceName)
        for(var mov of this.Moves){
            console.log(mov[0])
            if(mov[0] == pieceName){
                var moves_ = mov[1];
                var posX, posY;
                for(var moveHint of moves_){
                    posX = Position[0] + moveHint[0];
                    posY = Position[1] + moveHint[1];
                    console.log(posX,posY)
                    if(posX >= 0 && posX <= 7 && posY >= 0 && posY <= 7) {
                        console.log(1234)
                        if (this.board[posY][posX] == false) {
                            displayHints.push([posX,posY]);
                        } else {
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



