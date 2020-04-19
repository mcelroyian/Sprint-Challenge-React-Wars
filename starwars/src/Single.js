import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Character from './components/Character'
import './App.css';

const Single = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

const [currentChar, setCurrentChar] = useState({})
const [characters, setCharacters] = useState(null)
const [next, setNext] = useState(null)
const [prev, setPrev] = useState(null)
const [query, setQuery] = useState('https://swapi.py4e.com/api/people/1')
const [homeQuery, setHomeQuery] = useState(null)
const [speciesQuery, setSpeciesQuery] = useState(null)

useEffect(() => {
    axios.get(query)
    .then( res => {
      setCurrentChar(res.data)
      return res.data
    })
    .then(res2 => {
        const species = () => axios.get(res2.species[0])
        const homeworld = () => axios.get(res2.homeworld)
        return axios.all([species(), homeworld()])
    })
    .then( axios.spread((species, homeworld) => {
        debugger
    }))
    .catch( err => {
      console.log(err)
    })
},[query])



  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  //if (!characters || !currentChar.homeworld || !currentChar.species) return <h2>loading</h2>

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      <div className="wrapper">
    {
      currentChar && <Character key={currentChar.name} char={currentChar} />
    }
    </div>
    </div>
  );
}

export default Single;
