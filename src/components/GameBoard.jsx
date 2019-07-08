import React, { Component } from 'react';
import Card from './Card';
import { deckSelector } from '../Deck';

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
      deck: 'Colors'
    };

    this.init = this.init.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isCardMatch = this.isCardMatch.bind(this);
    this.restartGame = this.restartGame.bind(this);
    this.isGameOver = this.isGameOver.bind(this);
  }

  componentDidMount () {
    this.init();
  }

  init = () => {
    const size = this.props.deckSize;
    this.setState({
      isFlipped: Array(size * 2).fill(false),
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1,
      shuffledCard: deckSelector('colors').cards
    });
  }

  shuffle = () => {
    this.setState({
      shuffledCard: deckSelector(this.props.deck).cards
    });
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

  restartGame = () => {
    this.init();
    this.props.restartGame();
  }

  isGameOver = () => {
    const over = this.state.isFlipped.every((element, index, array) => element !== false);
    if (over) {
      this.props.gameOverCallback();
    }
  }

  render () {
    const { deck } = this.props;
    return (
      <div className={`game-board ${deck}`}>
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

export default GameBoard;
