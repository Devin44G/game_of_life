import React from 'react';


const Rules = () => {

  return(
    <>
      <h2 style={{marginLeft:'2rem'}}>The <i>Game of Life</i> Rules:</h2>
      <article style={{marginLeft:'2rem', marginBottom:'3rem'}}>
        <ol style={{listStylePosition:'inside'}}>
          <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
          <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
          <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
          <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ol>
        <br />
        <h3>These rules, which compare the behavior of the automaton to real life, can be condensed into the following:</h3>
        <ol style={{listStylePosition:'inside'}}>
          <li>Any live cell with two or three live neighbours survives.</li>
          <li>Any dead cell with three live neighbours becomes a live cell.</li>
          <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
        </ol>
      </article>
    </>
  );
};

export default Rules;
