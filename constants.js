export const WIN_MESSAGE = 'Congratulations! You Won The Game';
export const LOSE_MESSAGE = 'Congruatulations! You Lost The Game';

export const ROW_HEADER = '1 2 3 4 5 6 7';

export const CELL_INPUT_MSG = 'Enter Row And Column (e.g., "4 4"):';
export const CELL_INPUT_ERR =
	'Invalid input. Enter two numbers between 1 and 7.';

export const DIR_INPUT_MSG = 'Direction (U, D, L, R):';
export const DIR_INPUT_ERR = 'Invalid direction. Use U, D, L, or R.';

export const DIRECTIONS = {
	UP: { dr: -2, dc: 0 },
	DOWN: { dr: 2, dc: 0 },
	LEFT: { dr: 0, dc: -2 },
	RIGHT: { dr: 0, dc: 2 },
};

export const INPUT_MAP = {
	U: DIRECTIONS.UP,
	D: DIRECTIONS.DOWN,
	L: DIRECTIONS.LEFT,
	R: DIRECTIONS.RIGHT,
};

export const PEG = 1;
export const HOLE = 0;
export const INVALID = -1;
