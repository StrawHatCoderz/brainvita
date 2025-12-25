import { DIRECTIONS, PEG, HOLE, INVALID } from './main.js';

const getPegSurroundings = (row, col, direction) => {
	const { dr, dc } = direction;
	return {
		rMid: row + dr / 2,
		cMid: col + dc / 2,
		rDest: row + dr,
		cDest: col + dc,
	};
};

const isInsideBoard = function (row, col) {
	return row >= 0 && row < this.length && col >= 0 && col < this[0].length;
};

const buildBoard = () => [
	[INVALID, INVALID, PEG, PEG, PEG, INVALID, INVALID],
	[INVALID, INVALID, PEG, PEG, PEG, INVALID, INVALID],
	[PEG, PEG, PEG, PEG, PEG, PEG, PEG],
	[PEG, PEG, PEG, HOLE, PEG, PEG, PEG],
	[PEG, PEG, PEG, PEG, PEG, PEG, PEG],
	[INVALID, INVALID, PEG, PEG, PEG, INVALID, INVALID],
	[INVALID, INVALID, PEG, PEG, PEG, INVALID, INVALID],
];

const boardState = function () {
	return [...this.map((row) => [...row])];
};

const updateBoard = function (row, col, direction) {
	const { rMid, cMid, rDest, cDest } = getPegSurroundings(row, col, direction);
	this[row][col] = HOLE;
	this[rMid][cMid] = HOLE;
	this[rDest][cDest] = PEG;
};

const isValidMove = function (row, col, direction) {
	const { rMid, cMid, rDest, cDest } = getPegSurroundings(row, col, direction);
	if (!isInsideBoard.call(this, rDest, cDest)) return false;
	if (this[row][col] !== PEG) return false;
	if (this[rMid][cMid] !== PEG) return false;
	if (this[rDest][cDest] !== HOLE) return false;
	return true;
};

const availableMoves = function (row, col) {
	return Object.entries(DIRECTIONS)
		.filter(([_, dir]) => {
			return isValidMove.call(this, row, col, dir);
		})
		.map(([key]) => key);
};

export const createBoard = () => {
	const board = buildBoard();
	return {
		boardState: boardState.bind(board),
		updateBoard: updateBoard.bind(board),
		isValidMove: isValidMove.bind(board),
		availableMoves: availableMoves.bind(board),
	};
};
