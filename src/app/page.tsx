'use client';
import { useState, useEffect } from 'react';
import {
  initializeBoard,
  canMoveTile,
  moveTile,
  isGameWon,
  Tile,
} from '../lib/game';

export default function Home() {
  const [board, setBoard] = useState<Tile[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    setBoard(initializeBoard());
  }, []);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex !== null && board[targetIndex] === null) {
      // Проверяем, можно ли двигать плитку в позицию пустой
      if (canMoveTile(board, draggedIndex)) {
        const newBoard = moveTile(board, draggedIndex);
        setBoard(newBoard);
        setIsWon(isGameWon(newBoard));
      }
    }
    setDraggedIndex(null); // Сбрасываем состояние
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // Разрешаем "падение" на эту область
  };

  return (
    <div className="flex items-center justify-center flex-col m-10 ">
      <h1 className="text-3xl">15 Puzzle</h1>
      {isWon ? (
        <h2 className="text-2xl">🎉 You WON! 🎉</h2>
      ) : (
        <div className="grid grid-cols-4 gap-1  mt-4">
          {board.map((tile, index) => (
            <div
              key={index}
              draggable={!!tile}
              onDragStart={() => handleDragStart(index)}
              onDrop={() => handleDrop(index)}
              onDragOver={handleDragOver}
              className={`w-16 h-16 flex items-center justify-center text-lg border-2 rounded-lg shadow-md transition-transform duration-200 ${
                tile ? 'bg-gray-200 cursor-grab' : 'bg-white cursor-default'
              }`}
            >
              {tile}
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => {
          setBoard(initializeBoard());
          setIsWon(false);
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-5"
      >
        Restart the game
      </button>
    </div>
  );
}
