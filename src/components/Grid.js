import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';


const Grid = () => {
/******** PRE-DEFINED FUNCTIONS TO USE ********/
  const colNum = 25;
  const rowNum = 25;
  const operations = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
  ];
  const createGrid = () => {
    const rows = [];
    for(let i = 0; i < colNum; i++) {
      rows.push(Array.from(Array(rowNum), () => 0));
    }
    return rows;
  }

/******** SETTING STATE ********/
  // const [colNum, setColNum] = useState(25);
  // const [rowNum, setRowNum] = useState(25);
  const [speed, setSpeed] = useState(1000);
  const [generations, setGeneratons] = useState(0);
  const [started, setStarted] = useState(false);
  const [stepThrough, setStepThrough] = useState(false);
  const [grid, setGrid] = useState(() => {
    return createGrid();
  });

/******** SETTING REFS ********/
  const startedRef = useRef(started);
        startedRef.current = started;
  const stepThroughRef = useRef(stepThrough);
        stepThroughRef.current = stepThrough;
  const speedRef = useRef(speed);
        speedRef.current = speed;
  const generationsRef = useRef(generations);
        generationsRef.current = generations;

/******** CHANGE HANDLERS ********/
  const handleSpeed = (e) => {
    e.preventDefault();
    setSpeed(e.target.value);
  }
  const handleGen = () => {
    setGeneratons(generationsRef.current += 1);
  }
  // const handleGridSize = (e) => {
  //   setRowNum(e.target.value);
  //   setColNum(e.target.value);
  //   createGrid();
  // }

/******** ANIMATION FUNCTION ********/
  function anim() {
    setGrid((grid) => {
      return produce(grid, gridCopy => {
        for(let i = 0; i < rowNum; i++) {
          for(let j = 0; j < colNum; j++) {
            let neighbors = 0;
            operations.forEach(([x, y]) => {
              const newI = i + x;
              const newJ = j + y;
              if(newI >= 0 && newI < rowNum && newJ >= 0 && newJ < colNum) {
                neighbors += grid[newI][newJ];
              }
            });

            if(neighbors < 2 || neighbors > 3) {
              gridCopy[i][j] = 0;
            } else if(grid[i][j] === 0 && neighbors === 3) {
              gridCopy[i][j] = 1;
            }
          }
        }
      });
    });
    handleGen();
  }

  const runAnim = useCallback(() => {
    if(!startedRef.current) {
      return;
    }
    anim();

    setTimeout(runAnim, speedRef.current);
  }, [operations]);

  const clickThroughAnim = useCallback(() => {
    if(!stepThroughRef.current) {
      return;
    }
    anim();
  }, [operations]);

/******** UI BEGINS ********/
  return(
    <div style={{textAlign: 'center', marginTop: '2rem'}}>
      {/* BUTTONS */}
      <button style={{paddingRight:'1rem', paddingLeft:'1rem', marginRight:'.5rem'}}
        onClick={() => {
          setStarted(!started);
          if(!started) {
            startedRef.current = true;
            runAnim();
          }
        }}
      >
        {started ? 'Stop' : 'Start'}
      </button>
      <button style={{paddingRight:'1rem', paddingLeft:'1rem', marginRight:'.5rem'}}
        onClick={() => {
          const rows = [];
          for(let i = 0; i < colNum; i++) {
            rows.push(Array.from(Array(rowNum), () => Math.random() > .7 ? 1 : 0));
          }
          setGrid(rows);
        }}
      >
        Random
      </button>
      <button style={{paddingRight:'1rem', paddingLeft:'1rem', marginRight:'.5rem'}}
        onClick={() => {
          setGrid(createGrid());
          setGeneratons(0);
        }}
      >
        Clear
      </button>
      <button style={{paddingRight:'1rem', paddingLeft:'1rem', marginRight:'.5rem'}}
        onClick={() => {
          setStepThrough(true);
          if(stepThrough === true) {
            stepThroughRef.current = true;
            clickThroughAnim();
          }
        }}
      >
        Next Gen
      </button>
      {/* SPEED SELECTION */}
      <select name="speed" value={speed} onChange={handleSpeed}>
        <option value={1000}>--Select a Speed--</option>
        <option value={1000}>Normal</option>
        <option value={1500}>Slow</option>
        <option value={500}>Fast</option>
        <option value={200}>Very Fast</option>
        <option value={0}>Ultra Fast</option>
      </select>
      {/* GENERATION TRACKER */}
      <h3>Generation: {generationsRef.current}</h3>
      {/* THE GRID */}
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
                backgroundColor: (grid[i][j] === 1) ? 'darkslateblue' : '#f1f1f1'
              }}>
            </div>)
        )}
      </div>
    </div>
  );
};

export default Grid;
