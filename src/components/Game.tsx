import React, { useState, useEffect } from 'react';
import './Game.css';

const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

interface Cell {
  x: number;
  y: number;
}

const Game = () => {
  const [snake, setSnake] = useState<Cell[]>([{x:2,y:2}]);
  const [food, setFood] = useState<Cell>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          setDirection('UP');
          break;
        case 'ArrowDown':
          setDirection('DOWN');
          break;
        case 'ArrowLeft':
          setDirection('LEFT');
          break;
        case 'ArrowRight':
          setDirection('RIGHT');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (gameOver) return;

    const moveSnake = () => {
       
        
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
        default:
          break;
      }

      console.log('Head position after movement:', head);

      newSnake.unshift(head);

      console.log('After unshift (before pop if necessary):', newSnake);

      if (head.x === food.x && head.y === food.y) {
        setFood({
          x: Math.floor(Math.random() * (WIDTH / CELL_SIZE)),
          y: Math.floor(Math.random() * (HEIGHT / CELL_SIZE)),
        });
        console.log('Snake eats the food!');
      } else {
        //pop kia coz 2array push karne padenge agar food kha lia
        newSnake.pop();
      }

      console.log('After pop (if no food was eaten):', newSnake);

      if (
        head.x < 0 ||
        head.x >= WIDTH / CELL_SIZE ||
        head.y < 0 ||
        head.y >= HEIGHT / CELL_SIZE ||
        newSnake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameOver(true);
        console.log('Game over!');
      }

      setSnake(newSnake);
      console.log('Updated snake final:', newSnake);
    };

    const interval = setInterval(moveSnake, 100);

    return () => {
      clearInterval(interval);
    };
  }, [snake,direction]);

  const children = (
    <div className="game-area" style={{ width: WIDTH, height: HEIGHT }}>
      
      {snake.map((segment, index) => (
        <div
          key={index}
          className="snake-segment"
          style={{
            width: CELL_SIZE,
            height: CELL_SIZE,
            left: segment.x * CELL_SIZE,
            top: segment.y * CELL_SIZE,
          }}
        />
      ))}
      <div
        className="food"
        style={{
          width: CELL_SIZE,
          height: CELL_SIZE,
          left: food.x * CELL_SIZE,
          top: food.y * CELL_SIZE,
        }}
      />
     
      
      {gameOver && <div className="game-over">Game Over</div>}
    </div>
  );

  return (
    <>{children}</>
  );
};

export default Game;


 