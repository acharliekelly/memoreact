import React, { Component } from 'react';
import Card from './Card';
import GameOver from './GameOver';
import Header from './Header';
// import ScoreKeeper from './ScoreKeeper';
import { deckSelector } from '../Decks';

import '../css/deck.scss';

class MemoryGame extends Component {
/* State properties:
 * isFlipped: boolean array of BOARD_SIZE length
 * shuffledCard: int array of BOARD_SIZE length, in random order
 * clickCount: int, cards flipped (0, 1, or 2)
 * prevSelectedCard: int, previous card flipped, or -1 if none
 * prevCardId: int, the ID of prevSelectedCard
 * moveCount: int, the number of turns this game
 * showOptions: boolean
 */
  constructor (props) {
    super(props);
    this.state = {
      isFlipped: [],
      shuffledCard: [],
      clickCount: 1,
      prevSelectedCard: -1,
      prevCardId: -1,
      moveCount: 0,
      showOptions: false,
      deck: 'Colors'
    };

    this.init = this.init.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.changeDeck = this.changeDeck.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isCardMatch = this.isCardMatch.bind(this);
    this.moveCounter = this.moveCounter.bind(this);
    this.resetGame = this.resetGame.bind(this);
    this.showGameOptions = this.showGameOptions.bind(this);
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
      moveCount: 0,
      showOptions: false,
      deck: 'Colors',
      shuffledCard: deckSelector('colors').cards
    });
  }

  shuffle = () => {
    this.setState({
      shuffledCard: deckSelector(this.state.deck).cards
    });
  }

  changeDeck = deckName => {
    this.setState({
      deck: deckName,
      shuffledCard: deckSelector(deckName).cards
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
    this.setState({
      moveCount: this.state.moveCount + 1
    });
  }

  resetGame = () => {
    this.init();
  }

  isGameOver = () => {
    return this.state.isFlipped.every((element, index, array) => element !== false);
  }

  moveCounter = () => {
    return this.state.moveCount;
  }

  showGameOptions = () => {
    this.setState({
      showOptions: true
    });
  }

  render () {
    return (
      <div className="game-layout">
        <Header restartGame={this.resetGame} gameOptions={this.showGameOptions} />
        {/* <ScoreKeeper resetGame={this.restartGame} /> */}
        {this.state.showOptions && <div className="game-options">Game Options</div> }
        {this.isGameOver() ? <GameOver restartGame={this.resetGame} />
          : <div className={`game-board ${this.state.deck}`}>
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
        }
      </div>
    );
  }
}

export default MemoryGame;
