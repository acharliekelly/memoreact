import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import { deckSelector } from '../Deck';
import Grid from '../Grid';
import GameOver from './GameOver';

import '../css/deck.scss';

class GameBoard extends Component {
/* State properties:
 * gridSize: int, size of grid
 * isFlipped: boolean array of gridSize length
 * shuffledCard: int array of gridSize length, in random order
 * clickCount: int, cards flipped (0, 1, or 2)
 * prevSelectedCard: int, previous card flipped, or -1 if none
 * prevCardId: int, the ID of prevSelectedCard
 */
  constructor (props) {
    super(props);
    this.state = {
      gridSize: 0,
      isFlipped: [],
      shuffledCard: [],
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1,
      deck: '',
      grid: ''
    };
  }

  componentDidMount () {
    this.init();
  }

  init = () => {
    const { deck, grid } = this.props;
    const d = deckSelector(deck);
    const g = Grid.parseGrid(grid);
    // set board size = # of unique cards in deck * 2 || Grid
    const size = Math.max(d.max * 2, g.size);
    this.setState({
      deck: deck,
      grid: g.toString(),
      gridSize: size,
      isFlipped: Array(size).fill(false),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1,
      shuffledCard: d.cards
    });
  }

  newGame = () => {
    const size = this.state.gridSize;
    const d = deckSelector(this.state.deck);
    this.setState({
      isFlipped: Array(size).fill(false),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1,
      shuffledCard: d.cards
    });
    this.props.restartGame();
  }

  handleClick = event => {
    event.preventDefault();
    const cardId = event.target.id;
    const newFlips = this.state.isFlipped.slice();
    this.setState({
      prevSelectedCard: this.state.shuffledCard[cardId],
      prevCardId: cardId
    });

    if (newFlips[cardId] === false) {
      newFlips[cardId] = !newFlips[cardId];
      this.setState(prevState => ({
        isFlipped: newFlips,
        clickCount: this.state.clickCount + 1
      }));

      if (this.state.clickCount === 2) {
        this.setState({ clickCount: 1 });
        const prevCardId = this.state.prevCardId;
        const newCard = this.state.shuffledCard[cardId];
        const prevCard = this.state.prevSelectedCard;

        this.isCardMatch(prevCard, newCard, prevCardId, cardId);
      }
    }
  };

  isCardMatch = (card1, card2, card1Id, card2Id) => {
    if (card1 === card2) {
      const hideCard = this.state.shuffledCard.slice();
      hideCard[card1Id] = -1;
      hideCard[card2Id] = -2;
      setTimeout(() => {
        this.props.remainCounter();
        this.setState(prevState => ({
          shuffledCard: hideCard
        }));
      }, 1000);
    } else {
      const flipBack = this.state.isFlipped.slice();
      flipBack[card1Id] = false;
      flipBack[card2Id] = false;
      setTimeout(() => {
        this.setState(prevState => ({ isFlipped: flipBack }));
      }, 1000);
    }
    this.props.moveCounter();
  }

  render () {
    if (this.props.gameOver) {
      return (
        <GameOver restartGame={this.props.restartGame} />
      );
    } else {
      return (
        <div className={`game-board grid-${this.state.grid} ${this.state.deck}`}>
          {
            this.state.shuffledCard.map((cardNumber, index) =>
              <Card
                key={index}
                id={index}
                cardNumber={cardNumber}
                isFlipped={this.state.isFlipped[index]}
                handleClick={this.handleClick}
              />
            )
          }
        </div>
      );
    }
  }
}

GameBoard.propTypes = {
  deck: PropTypes.string.isRequired,
  grid: PropTypes.string.isRequired,
  moveCounter: PropTypes.func.isRequired,
  remainCounter: PropTypes.func.isRequired,
  restartGame: PropTypes.func.isRequired,
  gameOver: PropTypes.bool.isRequired
};

GameBoard.defaultProps = {
  deck: 'Colors',
  grid: '4x4',
  gameOver: false
};

export default GameBoard;
