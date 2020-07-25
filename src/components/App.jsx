import React from 'react';

import Container from 'react-bootstrap/Container';

import Header from './Header';
import Board from './Board';


const App = props => {
  return (
    <Container>
      <Header />
      <Board />
    </Container>
  );
};

export default App;