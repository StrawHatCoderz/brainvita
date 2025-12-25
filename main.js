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

const isInside = (n) => !isNaN(n) && n >= 0 && n <= 6;
const isValidCoord = (row, col) => isInside(row) && isInside(col);

const endGame = (state) => {
	const message = state === 'WON' ? WIN_MESSAGE : LOSE_MESSAGE;
	console.log(message);
};

const displayAvailableMoves = (availableMoves) => {
	console.log('Available Directions:', availableMoves.join(' '));
};

const getPegPosition = () => {
	const input = prompt(CELL_INPUT_MSG);
	if (!input) {
		return getPegPosition();
	}
	const [row, col] = parseCoords(input);
	if (!isValidCoord(row, col)) {
		console.log(CELL_INPUT_ERR);
		return getPegPosition();
	}
	return [row, col];
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
		const [row, col] = getPegPosition();
		const availableMoves = board.availableMoves(row, col);
		displayAvailableMoves(availableMoves);
		const direction = getPegDirection(availableMoves);
		game.playMove(row, col, direction);
	}
	endGame(game.getStatus());
};

initGame();
