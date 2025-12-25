import { createBoard } from './board.js';
import { createGame } from './game.js';
import {
	ROW_HEADER,
	LOSE_MESSAGE,
	WIN_MESSAGE,
	CELL_INPUT_MSG,
	CELL_INPUT_ERR,
	DIR_INPUT_MSG,
	DIR_INPUT_ERR,
	MOVES_ERR,
	PEG,
	HOLE,
	INVALID,
	INPUT_MAP,
} from './constants.js';

const underline = (text) =>
	text
		.split('')
		.map((_) => '-')
		.join('');

const parseCoords = (input) =>
	input
		.trim()
		.split(' ')
		.map((x) => parseInt(x) - 1);

const parseDirection = (input) => INPUT_MAP[input.toUpperCase()];

const endGame = (board) => {
	console.clear();
	displayBoard(board);
	const message = board.getStatus() === 'WON' ? WIN_MESSAGE : LOSE_MESSAGE;
	console.log(message);
};

const displayAvailableMoves = (availableMoves) => {
	console.log('Available Directions:', availableMoves.join(' '));
};

const getPegPosition = (board) => {
	const input = prompt(CELL_INPUT_MSG);
	if (!input) {
		return getPegPosition(board);
	}
	const [row, col] = parseCoords(input);
	if (!board.isValidPosition(row, col)) {
		console.log(CELL_INPUT_ERR);
		return getPegPosition(board);
	}
	const availableMoves = board.availableMoves(row, col);
	if (availableMoves.length === 0) {
		console.log(MOVES_ERR);
		return getPegPosition(board);
	}
	return [row, col, availableMoves];
};

const getPegDirection = (availableMoves) => {
	const direction = prompt(DIR_INPUT_MSG);
	const validMoves = availableMoves.map((move) => move[0].toLowerCase());
	if (!direction || !validMoves.includes(direction)) {
		console.log(DIR_INPUT_ERR);
		return getPegDirection(availableMoves);
	}
	return parseDirection(direction);
};

const formatRow = (row, rowNum) => {
	const symbols = { [PEG]: 'O', [HOLE]: '.', [INVALID]: ' ' };
	return [rowNum, row.map((cell) => symbols[cell]).join(' ')].join(' | ');
};

const displayBoard = (board) => {
	console.log(ROW_HEADER.padStart(ROW_HEADER.length + 4, ' '));
	console.log(underline(ROW_HEADER).padStart(ROW_HEADER.length + 4, ' '));

	board.forEach((row, index) => {
		console.log(formatRow(row, index + 1));
	});
	console.log('');
};

const initGame = () => {
	const board = createBoard();
	const game = createGame(board);

	while (game.getStatus() === 'PLAYING') {
		console.clear();
		displayBoard(board.boardState());
		const [row, col, availableMoves] = getPegPosition(board);
		displayAvailableMoves(availableMoves);
		const direction = getPegDirection(availableMoves);
		game.playMove(row, col, direction);
	}
	endGame(board);
};

initGame();
