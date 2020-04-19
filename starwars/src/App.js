import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Character from './components/Character'
import './App.css';

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.


const [characters, setCharacters] = useState(null)
const [xxtra, setXxtra] = useState(null)
const [query, setQuery] = useState('https://swapi.py4e.com/api/people/')

const getQuery = (url) => axios.get(url)

//search for match obj value of needle in array haystack
const findMatch = (needle, haystack) => {
  let match = haystack.filter(entry => entry.data.url === needle )
  if (match) return match[0].data.name
  return  "match not found"
}

//homeworld
//let homeworld =  findMatch(characters[0].homeworld, xxtra)


useEffect(() => {
  axios.get(query)
      .then(res => {
        let charList = res.data.results
          // Add array of characters to characters STATE
          setCharacters(charList)
          // Create array of axios calls 
          let extraUrls = charList.flatMap(char => [char.homeworld, char.species[0]] )
          // Remove duplicates
          let uniqueUrls = Array.from(new Set(extraUrls))
          let axiosCalls = uniqueUrls.map(url => getQuery(url))
          // return the axios calls
          return axios.all(axiosCalls)
      })
      .then((data) => {
        setXxtra(data)
      })
      .catch(err => {
          debugger
      })
}, [])



  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  if (!characters || !xxtra) return <h2>loading</h2>

  return (
    <div className="App">
      <h1 className="Header">Characters</h1>
      <div className="wrapper">
    {

      characters &&  characters.map( (char, i) => {
        let homeworld = findMatch(char.homeworld, xxtra)
        let species = findMatch(char.species[0], xxtra)
        
        return <Character key={i} char={char} homeworld={homeworld} species={species} />
    })
    }

    </div>
    </div>
  );
}

export default App;
