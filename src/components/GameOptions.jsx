import React from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown, Button } from 'react-bootstrap';
import { ThemesList } from '../model/Theme';
import { GridsList } from '../model/LayoutGrid';

const GameOptions = ({ options, submitHandler }) => {
  return (
    <div className="game-options">
      <header>Game Options</header>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="optionsForm.theme">
          <Form.Label>Deck: </Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="success">
              {options.theme}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {ThemesList.map(theme => (
                <Dropdown.Item
                  key={theme.name}
                  eventKey={theme.name}
                  active={theme.name === options.theme}
                >
                  {`${theme.name} (${theme.max})`}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group controlId="optionsForm.grid">
          <Form.Label>Grid Size: </Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="warning">
              {options.grid}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {GridsList.map(grid => (
                <Dropdown.Item
                  key={grid.name}
                  eventKey={grid.name}
                  active={grid.name === options.grid}
                >
                  {grid.listView}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Button variant="danger" type="submit">Start</Button>
      </Form>
    </div>
  );
};

GameOptions.propTypes = {
  options: PropTypes.object.isRequired,
  submitHandler: PropTypes.func.isRequired
};

export default GameOptions;
