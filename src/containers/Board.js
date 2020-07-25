import { connect } from 'redux';
import { 
  restartGame, 
  flipCard
} from '../actions';
import Board from '../components/Board';

const mapStateToProps = state => ({
  deckId: state.deck.id,
  gridSize: state.gridSize,
  tiles: state.tiles,
  isGameOver: state.gameOver
});

const actionCreators = {
  restartGame,
  flipTile: flipCard
};

export default connect(mapStateToProps, actionCreators)(Board);