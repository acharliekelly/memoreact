import { connect } from 'redux';
import { 
  changeDeck,
  resizeBoard
} from '../actions';
import Header from '../components/Header';

const mapStateToProps = state => ({
  boardSize: state.gridSize,
  currentDeck: state.deck,
  moves: state.moves,
  matches: state.matches
});

const actionCreators = {
  updateDeck: changeDeck, 
  updateBoardSize: resizeBoard
};

export default connect(mapStateToProps, actionCreators)(Header);