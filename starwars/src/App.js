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

const createCharacter = (characters) => {
  let list = ''
  characters.map(char => {
    getExtraData(char)
    list = list + `<Character hometown=${currentChar.hometown}  species=${currentChar.species} key=${char.created} char=${char} />`
    debugger
  })
  return list
}

const getExtraData = (character) => {
  setHomeQuery(character.homeworld)
  setSpeciesQuery(character.species[0])

}

useEffect(() => {
  const getData = () => {
    axios.get(speciesQuery)
    .then( res => {
      let newState = {...currentChar, species: res.data[0].name}
      setCurrentChar(newState)
    })
    .catch( err => {
      console.log(err)
    })
  }
  getData();
}, [speciesQuery, currentChar])

useEffect(() => {
  function getData() {
    axios.get(homeQuery)
    .then( res => {
      let newState = {...currentChar, hometown: res.data.name}
      setCurrentChar(newState)
    })
    .catch( err => {
      console.log(err)
    })
  }
  getData();
}, [homeQuery, currentChar])

useEffect(() => {
  const fetchData = () => {
    axios.get(query)
    .then( res => {
      setCharacters(res.data.results)
      getExtraData(res.data.results[0])
    })
    .catch( err => {
      console.log(err)
    })
  }
  fetchData();
  
  
},[])



  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  //if (!characters || !currentChar.homeworld || !currentChar.species) return <h2>loading</h2>

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      <div className="wrapper">
    {
      characters && createCharacter(characters)
    }
    </div>
    </div>
  );
}

export default App;
