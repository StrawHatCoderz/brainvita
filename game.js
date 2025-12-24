import { DIRECTIONS, PEG } from './main.js';

const gameState = (myBoard) => {
	const board = myBoard.boardState();

	let pegCount = 0;
	let canMove = false;
	const dirs = Object.values(DIRECTIONS);
	for (let r = 0; r < board.length; r++) {
		for (let c = 0; c < board[r].length; c++) {
			if (board[r][c] === PEG) {
				pegCount++;
				if (!canMove) {
					for (const d of dirs) {
						if (myBoard.isValidMove(r, c, d)) {
							canMove = true;
							break;
						}
					}
				}
			}
		}
	}
	if (pegCount === 1) return 'WON';
	if (pegCount > 1 && !canMove) return 'LOST';
	return 'PLAYING';
};

export const createGame = () => {
	return {
		state: function (board) {
			return gameState(board);
		},
	};
};
