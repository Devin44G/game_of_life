import React, { useState } from 'react';
import produce from 'immer';


const Grid = () => {
  const colNum = 25;
  const rowNum = 25;

  const [alive, setAlive] = useState(false);
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for(let i = 0; i < colNum; i++) {
      rows.push(Array.from(Array(rowNum), () => 0));
    }
    return rows;
  });

  return(
    <div
      style={{
        marginTop: '2rem',
        marginBottom: '2rem',
        display: 'grid',
        gridTemplateColumns: `repeat(${colNum}, 1.5rem)`,
        justifyContent: 'center'
      }}>
      { grid.map((rows, i) =>
        rows.map((cols, j) =>
          <div
            onClick={() => {
              setGrid(produce(grid, gridCopy => {
                gridCopy[i][j] = grid[i][j] ? 0 : 1;
              }))
            }}
            key={`${i}-${j}`}
            style={{
              width:'1.5rem',
              height:'1.5rem',
              border:'solid 1px black',
              backgroundColor: (grid[i][j] == 1) ? 'darkslateblue' : '#f1f1f1'
            }}>
          </div>)
      )}
    </div>
  );
};

export default Grid;
