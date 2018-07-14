import React, { Component } from "react";
import "./App.css";
import * as img from "./img";

import {Motion, spring} from 'react-motion'; 

import Scores from "./Scores";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topScore: 0,
      currentGuesses: [],
      currentScore: 0,
      currentOrder: [...Object.values(img)]
    };
    this.handleClick = this.handleClick.bind(this);
    this.setTopScore = this.setTopScore.bind(this);
  }

  componentDidMount() {

  }

  componentDidUpdate () {
    this.setTopScore()
  }
  
  handleClick(e) {
    let x = e.target.src.slice(35, -13).substring(0, 10);
    this.state.currentGuesses.includes(x)
    ? this.loseGame()
    : this.setState((previousState, currentProps) => {
      return {
        ...previousState,
        currentGuesses: [...this.state.currentGuesses, x]
      };
    });
    this.setState({currentOrder: shuffleArray(Object.values(img))});
  }
  
  setTopScore() {
    this.state.topScore < this.state.currentGuesses.length &&
    this.setState({ topScore: this.state.currentGuesses.length });
  }

  loseGame() {
    this.setState({
      currentGuesses: [],
      currentScore: 0
    });
  }

  render() {
    const { currentGuesses, topScore, currentOrder } = this.state;
    return (
      <div className="App">
        <header className="h3 bg-green t-0">
          <h1 className="pa2">Clicky imagy game</h1>
        </header>
        {
          topScore === 12 && <div className="f1">Congrats!!! You Win!!!</div>
        }
        <div className="mw8 center ma3 pt5">
          {currentOrder.map(x => (
            <img
              className="mw4 ma3 grow"
              onClick={this.handleClick}
              src={x}
              alt="character"
            />
          ))}
        </div>
        <Scores current={currentGuesses.length} top={topScore} />
      </div>
    );
  }
}

export default App;


const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}