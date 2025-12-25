export const PEG = 1;
export const HOLE = 0;
export const INVALID = -1;

export const DIRECTIONS = {
	UP: { dr: -2, dc: 0 },
	DOWN: { dr: 2, dc: 0 },
	LEFT: { dr: 0, dc: -2 },
	RIGHT: { dr: 0, dc: 2 },
};

const getJumpCoordinates = (row, col, direction) => {
	const { dr, dc } = direction;
	return {
		rMid: row + dr / 2,
		cMid: col + dc / 2,
		rDest: row + dr,
		cDest: col + dc,
	};
};

const isInsideBoard = (board, row, col) =>
	row >= 0 && row < board.length && col >= 0 && col < board[0].length;

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

export const createBoard = () => {
	const board = buildBoard();

	const getBoardSnapshot = () => board.map((row) => [...row]);

	const isValidMove = (row, col, direction) => {
		const { rMid, cMid, rDest, cDest } = getJumpCoordinates(
			row,
			col,
			direction
		);
		return (
			isPeg(board, row, col) &&
			isPeg(board, rMid, cMid) &&
			isEmpty(board, rDest, cDest)
		);
	};

	const move = (row, col, direction) => {
		const { rMid, cMid, rDest, cDest } = getJumpCoordinates(
			row,
			col,
			direction
		);
		board[row][col] = HOLE;
		board[rMid][cMid] = HOLE;
		board[rDest][cDest] = PEG;
	};

	const availableMoves = (row, col) =>
		Object.entries(DIRECTIONS)
			.filter(([_, dir]) => isValidMove(row, col, dir))
			.map(([key]) => key);

	const hasAnyValidMoves = () =>
		board.some((row, rIdx) =>
			row.some(
				(cell, cIdx) =>
					cell === PEG &&
					Object.values(DIRECTIONS).some((dir) => isValidMove(rIdx, cIdx, dir))
			)
		);

	const getPegCount = () => board.flat().filter((cell) => cell === PEG).length;

	return {
		boardState: getBoardSnapshot,
		executeMove: move,
		isValidMove,
		availableMoves,
		hasAnyValidMoves,
		getPegCount,
	};
};
