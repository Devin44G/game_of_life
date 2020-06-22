import React, { useState } from 'react';


const Grid = () => {
  const colNum = 25;
  const rowNum = 25;

  const [grid, setGrid] = useState(() => {
    const rows = [];
    for(let i = 0; i < colNum; i++) {
      rows.push(Array.from(Array(rowNum), () => 0));
    }
    return rows;
  });

  return(
    <div style={{
      marginTop: '2rem',
      display: 'grid',
      gridTemplateColumns: `repeat(${colNum}, 2rem)`,
      justifyContent: 'center'
    }}>
      { grid.map((rows, i) =>
        rows.map((cols, j) =>
          <div
            key={`${i}-${j}`}
            style={{
              width:'2rem',
              height:'2rem',
              border:'solid 1px black'
            }}>
          </div>)
      )}
    </div>
  );
};

export default Grid;
