import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Character from './components/Character'
import './App.css';

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

const [currentChar, setCurrentChar] = useState({})
const [characters, setCharacters] = useState(null)
const [next, setNext] = useState(null)
const [prev, setPrev] = useState(null)
const [query, setQuery] = useState('https://swapi.py4e.com/api/people/')
const [homeQuery, setHomeQuery] = useState(null)
const [speciesQuery, setSpeciesQuery] = useState(null)


//For each Character
// make a new request for homeworld and species.
// save to state. 
// pass to Character component

const getExtraData = (character) => {

}

useEffect(() => {
  const getData = () => {
    axios.get(query)
    .then( res => {
      setSpeciesQuery(res.data.results)
    })
  }
  getData();
}, [speciesQuery])

useEffect(() => {
  const getData = () => {
    axios.get(query)
    .then( res => {
      setHomeQuery(res.data.results)
    })
  }
  getData();
}, [homeQuery])

useEffect(() => {
  const fetchData = () => {
    axios.get(query)
    .then( res => {
      setCharacters(res.data.results)
      setNext(res.data.next)
    })
  }
  fetchData();
  
}, [query])



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
