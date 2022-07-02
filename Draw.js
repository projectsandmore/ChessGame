

class Draw{
    constructor(context, GameBoard) {
        this.board = new Image();
        this.board.src = "https://github.com/projectsandmore/ChessGame/tree/master/gameImages/board.png";

        this.piecies = ["pawn","rook","knight","bishop","queen","king"];
        this.images = this.loadPiecies(this.piecies);

        this.GameBoard = GameBoard;
        this.context = context;
        this.hover = this.GameBoard.hover;
        this.selectedPiece = this.GameBoard.selectedPiece;

    }

    reloadBoard(board){
        this.GameBoard = board;
        this.hover = board.hover;
        this.selectedPiece = board.selectedPiece;

    }


    loadPiecies(piecies){
        var data = [];
        var types = ["white","black"];
        for(var type=0; type<types.length; type++) {
            for (let piece in piecies) {
                var imgpics = new Image();
                if(type == 0) types = "white";
                if(type == 1) types = "black";
                var piecname = "chess-"+piecies[piece]+"-"+types;
                imgpics.src = "https://github.com/projectsandmore/ChessGame/tree/master/gameImages/" + piecname + ".png"
                data.push(imgpics);
            }
        }
        return(data);
    }


    Board() {
        var color_ = 0;

        this.context.drawImage(this.board, 0, 0, 800, 800);
        for (var x1 = 0; x1 < 8; x1++) {
            for (var y2 = 0; y2 < 8; y2++) {
                if (this.GameBoard.board[y2][x1] !== false) {
                    color_ = 0;
                    if (this.GameBoard.board[y2][x1][1] == "black") {
                        color_ = 6;
                    }
                    this.context.drawImage(this.images[this.findPos(this.piecies, this.GameBoard.board[y2][x1][0]) + color_], 100 * x1, 99 * y2, 110, 110)
                }

                //Display Hints
                for (var hint of  this.GameBoard.PieceHint) {
                    if(x1 == hint[0] && y2 == hint[1]){
                        this.context.strokeStyle = "rgb(55,250,10)"
                        this.context.lineWidth = 2;
                        this.context.strokeRect(100 * x1 + 1, 100 * y2, 100, 100)
                    }
                }

            }
        }
    }

    drawSelected(){

        for (var x1 = 0; x1 < 8; x1++) {
            for (var y2 = 0; y2 < 8; y2++) {
                if ( this.hover[0] == x1 &&  this.hover[1] == y2) {
                    this.context.strokeStyle = "rgb(0,0,0)"
                    this.context.lineWidth = 2;
                    this.context.strokeRect(100 * x1 + 1, 100 * y2, 100, 100)
                }

            }

        }


    }

    drawPickedUP(){
        if( this.selectedPiece !== false){
            var xpos =  this.selectedPiece[0];
            var ypos =  this.selectedPiece[1];
            var color_ = 0;
            if( this.GameBoard.board[ypos][xpos][1] == "black"){
                color_ = 6;
            }
            this.context.drawImage( this.images[this.findPos( this.piecies, this.GameBoard.board[ypos][xpos][0])+color_],100* this.hover[0],100* this.hover[1],100,100)
        }

    }

    findPos(array,val){
        for(var element = 0; element< array.length; element ++){
            if(array[element] == val){
                return(element);
            }
        }
        return(-1);

    }

}
export default Draw;