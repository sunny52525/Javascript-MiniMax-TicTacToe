
var player =1,opponent=0;
// MINIMAX Algorithm Credit : Geeks For Geeks
function isMovesLeft(board){
    for(var i =0 ; i<3 ;i++){
        for(var j =0 ; j<3 ;j++){
            if(board[i][j]==-1)
                return true;
        }
    }
    return false;
}


function evaluate(b){
    //Checking for victory (row)
    for(var row =0 ; row<3;row++){
        if(b[row][0]==b[row][1] && b[row][1]==b[row][2]){

            if (b[row][0] == player) 
                return 10;
            else if (b[row][0] == opponent) 
                return -10;
        }
    }
    //checking for victory (column)
    for(var col =0 ; col< 3 ;col++){

        if (b[0][col] == b[1][col] &&  b[1][col] == b[2][col]) {
            if (b[0][col] == player) 
                return 10;
            else if (b[0][col] == opponent) 
                return -10;
        }
    }

    //Diagonals
    if (b[0][0] == b[1][1] && b[1][1] == b[2][2]) {
        if (b[0][0] == player)
             return 10;
         else if (b[0][0] == opponent) 
            return -10;
    }
    if (b[0][2] == b[1][1] && b[1][1] == b[2][0]) {
        if (b[0][2] == player) 
            return 10; 
        else if (b[0][2] == opponent) 
            return -10;
    }

    // Else if none of them have won then return 0
    return 0

}

function minimax(board,depth,isMax){

    var score=evaluate(board);
    // console.log(score);
    // Maximizer Won
    if(score==10) 
        return score;
    //Minimizer Won
    if(score==-10)
        return score;

    // No One Won Yet
    if(isMovesLeft(board)==false)
        return 0;
    
    
    if(isMax){
        var best=-1000
        for(var i = 0 ; i<3 ;i++){
            for(var j  = 0 ; j<3 ;j++){
                if(board[i][j]==-1){
                    
                    board[i][j]=player;

                    //Call MiniMax recursively to chose max Value
                    best=Math.max(best,minimax(board,depth+1,!isMax));
                    
                    board[i][j]=-1;
                }
            }
        }
        return best;
    } else{
        var best=1000
        for(var i = 0 ; i<3 ;i++){
            for(var j  = 0 ; j<3 ;j++){
                if(board[i][j]==-1){
                    
                    board[i][j]=opponent;

                    //Call MiniMax recursively to chose max Value
                    best=Math.min(best,minimax(board,depth+1,!isMax));
                    
                    board[i][j]=-1;
                }
            }
        }
        return best;
    }
  
}


function bestMove(board) {
    var bestVal=-1000;
    var moves=[-1,-1];
    for(var i =0 ; i < 3 ; i++){
        for(var j =0 ; j < 3 ; j++){
            //if cell is empty
            if(board[i][j] == -1){
                //make this move
                board[i][j]=player;
                
                var moveVal= minimax(board,0,false);

                board[i][j]=-1;

                if(moveVal>bestVal){
                    moves[0]=i;
                    moves[1]=j;
                    bestVal=moveVal
                }

            }
        }
    }
    return moves
}

var matrix=[
    [-1,-1,-1],
    [-1,-1,0],
    [-1,-1,-1]
]
console.log(bestMove(matrix))