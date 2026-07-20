const socket = io({ autoConnect: false });
const chess = new Chess();
const boardElement = document.querySelector('.chessboard');

let draggedPiece = null;
let sourceSquare = null;
let PlayerRole = null; 

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = '';
    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
           const squareElement = document.createElement('div');
           squareElement.classList.add('square' , (rowIndex + squareIndex) % 2 === 0 ? 'light' : 'dark');

           squareElement.dataset.row = rowIndex;
           squareElement.dataset.col = squareIndex;

           if(square) {
               const pieceElement = document.createElement('div');
               pieceElement.classList.add('piece' , square.color === 'w' ? 'white' : 'black');
               pieceElement.innerText = getPieceUnicode(square);
               pieceElement.draggable = PlayerRole === square.color;

               pieceElement.addEventListener('dragstart', (e) => {
                    if(pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = {row: rowIndex, col: squareIndex};
                        e.dataTransfer.setData('text/plain', "");
                    }
               });

               pieceElement.addEventListener('dragend', (e) => {
                draggedPiece = null;
                sourceSquare = null;
               });

               squareElement.appendChild(pieceElement);
           }

           squareElement.addEventListener('dragover', (e) => {
                e.preventDefault();
           });
           
           squareElement.addEventListener('drop', (e) => {
                e.preventDefault();
                if(draggedPiece){
                    const targetSquare = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col)
                    };
                    handleMove(sourceSquare, targetSquare);
                }
                
           });
           boardElement.appendChild(squareElement);

        });
            
    });

    if(PlayerRole === "b"){
        boardElement.classList.add('flipped');
    }else {
        boardElement.classList.remove('flipped');
    }
};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: 'q' // Default promotion to queen
    }

    socket.emit('move', move);
};

const getPieceUnicode = (piece) => {
    const unicodePieces = {
        K: "♔",  // King
        Q: "♕",  // Queen
        R: "♖",  // Rook
        B: "♗",  // Bishop
        N: "♘",  // Knight
        P: "♙",  // Pawn
        k: "♚",  // King
        q: "♛",  // Queen
        r: "♜",  // Rook
        b: "♝",  // Bishop
        n: "♞",  // Knight
        p: "♟"   // Pawn
    };
    return unicodePieces[piece.type.toUpperCase()] || '';
};

socket.on("playerRole", (role) => {
    PlayerRole = role;
    renderBoard();
});

socket.on("spectatorRole", () => {
    PlayerRole = "spectator";
    renderBoard();
});

socket.on("Boardstate", (fen) => {
    chess.load(fen);
    renderBoard();
});

socket.on("move", (move) => {
    chess.move(move);
    renderBoard();
});

socket.connect();

renderBoard();