export type Tile = number | null;

export const initializeBoard = (): Tile[] => {
  const tiles = Array.from({ length: 15 }, (_, i) => i + 1).concat(null);
  return shuffle(tiles);
};

const shuffle = (array: Tile[]): Tile[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const canMoveTile = (board: Tile[], tileIndex: number): boolean => {
  const emptyIndex = board.indexOf(null);
  const diff = Math.abs(emptyIndex - tileIndex);

  return diff === 1 || diff === 4; // Сосед по горизонтали или вертикали.
};

export const moveTile = (board: Tile[], tileIndex: number): Tile[] => {
  const emptyIndex = board.indexOf(null);
  const newBoard = [...board];
  [newBoard[emptyIndex], newBoard[tileIndex]] = [newBoard[tileIndex], newBoard[emptyIndex]];
  return newBoard;
};

export const isGameWon = (board: Tile[]): boolean => {
  const winningBoard = Array.from({ length: 15 }, (_, i) => i + 1).concat(null);
  return board.every((tile, index) => tile === winningBoard[index]);
};