import { DIRECTIONS, PEG, HOLE, INVALID } from './main.js';

const calculateJumpSequence = (row, col, direction) => {
	const { dr, dc } = direction;
	return {
		rMid: row + dr / 2,
		cMid: col + dc / 2,
		rDest: row + dr,
		cDest: col + dc,
	};
};

const isInsideBoard = function (board, row, col) {
	return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
};

const getSlot = (board, row, col) =>
	isInsideBoard(board, row, col) ? board[row][col] : null;

const isPeg = (board, row, col) => getSlot(board, row, col) === PEG;
const isEmpty = (board, row, col) => getSlot(board, row, col) === HOLE;

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
	return this.map((row) => [...row]);
};

const updateBoard = function (row, col, direction) {
	const { rMid, cMid, rDest, cDest } = calculateJumpSequence(
		row,
		col,
		direction
	);
	this[row][col] = HOLE;
	this[rMid][cMid] = HOLE;
	this[rDest][cDest] = PEG;
};

const isValidMove = function (row, col, direction) {
	const { rMid, cMid, rDest, cDest } = calculateJumpSequence(
		row,
		col,
		direction
	);
	return (
		isInsideBoard(this, rDest, cDest) &&
		isPeg(this, row, col) &&
		isPeg(this, rMid, cMid) &&
		isEmpty(this, rDest, cDest)
	);
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
