import { createBoard, DIRECTIONS, PEG, HOLE, INVALID } from './board.js';
import { createGame } from './game.js';

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
	const game = createGame(board);

	while (game.getStatus() === 'PLAYING') {
		console.clear();
		displayBoard(board.boardState());
		const [row, col] = getPegPosition();
		displayAvailableMoves(board, row, col);
		const direction = getPegDirection();
		game.playMove(row, col, direction);
	}
	endGame(game.getStatus());
};

main();
