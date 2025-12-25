import { createBoard } from './board.js';
import { createGame } from './game.js';
import { INPUT_MAP, ROW_HEADER, PEG, HOLE, INVALID } from './constants.js';

export const WINNING_MOVES = [
	[1, 3, 'DOWN'],
	[2, 1, 'RIGHT'],
	[0, 2, 'DOWN'],
	[0, 4, 'LEFT'],
	[2, 3, 'LEFT'],
	[2, 0, 'RIGHT'],
	[2, 4, 'UP'],
	[2, 6, 'LEFT'],
	[3, 2, 'UP'],
	[0, 2, 'DOWN'],
	[3, 0, 'RIGHT'],
	[3, 2, 'UP'],
	[3, 4, 'UP'],
	[0, 4, 'DOWN'],
	[3, 6, 'LEFT'],
	[3, 4, 'UP'],
	[5, 2, 'UP'],
	[4, 0, 'RIGHT'],
	[4, 2, 'UP'],
	[1, 2, 'DOWN'],
	[3, 2, 'RIGHT'],
	[4, 4, 'UP'],
	[1, 4, 'DOWN'],
	[4, 6, 'LEFT'],
	[4, 3, 'RIGHT'],
	[6, 4, 'UP'],
	[3, 4, 'DOWN'],
	[6, 2, 'RIGHT'],
	[6, 4, 'UP'],
	[4, 5, 'LEFT'],
	[5, 3, 'UP'],
];

export const LOSING_MOVES = [
	[1, 3, 'DOWN'],
	[4, 3, 'UP'],
	[3, 1, 'RIGHT'],
	[3, 4, 'LEFT'],
	[3, 6, 'LEFT'],
	[6, 3, 'UP'],
];

const underline = (text) =>
	text
		.split('')
		.map(() => '-')
		.join('');

const formatRow = (row, rowNum) => {
	const symbols = { [PEG]: 'O', [HOLE]: '.', [INVALID]: ' ' };
	return [rowNum, row.map((cell) => symbols[cell]).join(' ')].join(' | ');
};

const displayBoard = (boardState) => {
	console.log(ROW_HEADER.padStart(ROW_HEADER.length + 4, ' '));
	console.log(underline(ROW_HEADER).padStart(ROW_HEADER.length + 4, ' '));
	boardState.forEach((row, index) => {
		console.log(formatRow(row, index + 1));
	});
	console.log('');
};

const playNextMove = (game, board, moves, index = 0) => {
	if (index >= moves.length) {
		console.log('Final Game Status:', game.getStatus());
		return;
	}

	const [r, c, d] = moves[index];
	const dir = INPUT_MAP[d.charAt(0)];
	const result = game.playMove(r, c, dir);

	console.clear();
	displayBoard(board.boardState());

	if (!result.success) {
		console.log('CRASH! Illegal move detected. Stopping.');
		return;
	}

	setTimeout(() => {
		playNextMove(game, board, moves, index + 1);
	}, 1000);
};

const testGame = () => {
	const board = createBoard();
	const game = createGame(board);
	playNextMove(game, board, WINNING_MOVES);
};

testGame();
