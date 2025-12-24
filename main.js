import { createBoard } from './board.js';
import { createGame } from './game.js';

export const PEG = 1;
export const HOLE = 0;
export const INVALID = -1;

export const DIRECTIONS = {
	UP: { dr: -2, dc: 0 },
	DOWN: { dr: 2, dc: 0 },
	LEFT: { dr: 0, dc: -2 },
	RIGHT: { dr: 0, dc: 2 },
};

const INPUT_MAP = {
	U: DIRECTIONS.UP,
	D: DIRECTIONS.DOWN,
	L: DIRECTIONS.LEFT,
	R: DIRECTIONS.RIGHT,
};

const displayBoard = (board) => {
	const symbols = { [PEG]: 'O', [HOLE]: '.', [INVALID]: ' ' };

	console.log('    1 2 3 4 5 6 7');
	console.log('   ---------------');

	board.forEach((row, index) => {
		const rowNum = index + 1;
		const rowString = row.map((c) => symbols[c]).join(' ');
		console.log(`${rowNum} | ${rowString}`);
	});
	console.log('');
};

const getPegPosition = () => {
	const promptMessage = 'Enter Row And Column of Peg ex: 6 4: ';
	return prompt(promptMessage)
		.split(' ')
		.map((x) => parseInt(x) - 1);
};

const getPegDirection = () => {
	const promptMessage = 'Choose Direction from Available Directions';
	return INPUT_MAP[prompt(promptMessage).toUpperCase()];
};

const displayAvailableMoves = (board, row, col) => {
	const availableMoves = board.availableMoves(row, col);
	console.log('Available Directions:', availableMoves.join(''));
};

const endGame = (state) => {
	state === 'WON'
		? console.log('You Won the Game')
		: console.log('You Lost the Game');
};

const main = () => {
	const board = createBoard();
	const game = createGame();

	while (game.state(board) === 'PLAYING') {
		console.clear();
		displayBoard(board.boardState());
		const [row, col] = getPegPosition();
		displayAvailableMoves(board, row, col);
		const direction = getPegDirection();
		if (board.isValidMove(row, col, direction)) {
			board.updateBoard(row, col, direction);
		}
	}
	endGame(game.state(board));
};

main();
