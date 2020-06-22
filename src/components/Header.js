import React from 'react';


const Header = () => {

  return(
    <header
      style={{
        fontSize: '1.5rem',
        textAlign:'center',
        textDecoration: 'underline',
        padding: '2rem',
        backgroundColor: '#eee'
      }}>
      <h1>Welcome to John Conway's <i>Game of Life</i>!</h1>
    </header>
  );
};

export default Header;
