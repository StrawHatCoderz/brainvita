export const createGame = (board) => {
	const getStatus = () => {
		const pegCount = board.getPegCount();
		if (pegCount === 1) return 'WON';
		if (pegCount > 1) {
			if (!board.hasAnyValidMoves()) return 'LOST';
		}
		return 'PLAYING';
	};

	const playMove = (row, col, direction) => {
		if (!board.isValidMove(row, col, direction)) {
			return { success: false };
		}
		board.executeMove(row, col, direction);
		return { success: true };
	};

	return {
		getStatus,
		playMove,
	};
};
