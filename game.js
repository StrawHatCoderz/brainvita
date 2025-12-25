import { DIRECTIONS, PEG } from './main.js';

const getStatus = (gameBoard) => {
	const board = gameBoard.boardState;
	let pegCount = 0;
	let canMove = false;
	const dirs = Object.values(DIRECTIONS);
	for (let r = 0; r < board.length; r++) {
		for (let c = 0; c < board[r].length; c++) {
			if (board[r][c] === PEG) {
				pegCount++;
				if (!canMove) {
					for (const d of dirs) {
						if (gameBoard.isValidMove(r, c, d)) {
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

export const createGame = (gameBoard) => {
	return {
		getStatus: () => getStatus(gameBoard),
		playMove: (row, col, direction) => {
			if (!gameBoard.isValidMove(row, col, direction)) {
				return { success: false };
			}
			gameBoard.executeMove(row, col, direction);
			return { success: true };
		},
	};
};
