export const createGame = (board) => {
	let pegCount = board.getPegCount();

	const getStatus = () => {
		if (pegCount === 1) return 'WON';
		if (pegCount > 1) {
			if (!board.hasAnyValidMoves()) return 'LOST';
		}
		return 'PLAYING';
	};
	const playMove = (row, col, direction) => {
		if (!board.isValidMove(row, col, direction)) {
			return { success: false, status: getStatus() };
		}
		board.executeMove(row, col, direction);
		pegCount--;
		return { success: true, status: getStatus() };
	};

	return {
		getStatus,
		playMove,
	};
};
