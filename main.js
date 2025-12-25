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

const askUntilValid = (question, parseFn, isValidFn, errorMsg) => {
	const input = prompt(question);

	if (!input) return askUntilValid(question, parseFn, isValidFn, errorMsg);

	const result = parseFn(input);
	if (!isValidFn(result)) {
		console.log(errorMsg);
		askUntilValid(question, parseFn, isValidFn, errorMsg);
	}
	return result;
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

	let message = '';
	while (game.getStatus() === 'PLAYING') {
		console.clear();
		displayBoard(board.boardState());
		if (message) console.log(`\n📢 ${message}\n`);
		message = '';
		const [row, col] = getPegPosition();

		displayAvailableMoves(board, row, col);

		const direction = getPegDirection();

		const result = game.playMove(row, col, direction);

		if (!result.success) {
			message = '❌ Invalid Move! Try again.';
		}
	}

	endGame(game.getStatus());
};

main();
