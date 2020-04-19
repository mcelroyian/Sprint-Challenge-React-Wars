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
    const [query, setQuery] = useState(null)
    const [currentHomeworld, setCurrentHomeworld] = useState(null)
    const [currentSpecies, setCurrentSpecies] = useState(null)


    useEffect(() => {
            let query = 'https://swapi.py4e.com/api/people/1'
            axios.get(query)
                .then(res => {
                    setCurrentChar(res.data)
                    return res.data
                })
                .then(res2 => {
                    const species = () => axios.get(res2.species[0])
                    const homeworld = () => axios.get(res2.homeworld)
                    return axios.all([species(), homeworld()])
                })
                .then(axios.spread((species, homeworld) => {
                    debugger
                    setCurrentHomeworld(species.data.name)
                    setCurrentSpecies(homeworld.data.name)
                }))
                .catch(err => {
                    console.log(err)
                })

    }, [])

    if (!currentChar || !currentHomeworld || !currentSpecies) return <h2>loading</h2>

    return (
        <div className="App">
            <h1 className="Header">Characters</h1>
            <div className="wrapper">

                {
                  currentChar &&  <p>{currentChar.name}</p>
                }  
            </div>
        </div>
    );
}

export default Single;
