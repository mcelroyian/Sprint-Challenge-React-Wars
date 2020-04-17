import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Character from './components/Character'
import './App.css';

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

const [currentChar, setCurrentChar] = useState(null)
const [characters, setCharacters] = useState(null)
const [next, setNext] = useState(null)
const [prev, setPrev] = useState(null)
const people = 'https://swapi.py4e.com/api/people/';

const getExtraData = (character) => {

}

useEffect(() => {
  axios.get(people)
    .then( res => {
      setCharacters(res.data.results)
      setNext(res.data.next)
      debugger
    })
    .catch( err => {
      debugger
    })
}, [])

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      <div className="wrapper">
    {
      characters && characters.map(char => <Character key={char.created} char={char} />)
    }
    </div>
    </div>
  );
}

export default App;
