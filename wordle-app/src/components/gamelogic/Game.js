import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { green, yellow } from '@mui/material/colors';

const PokemonWordleGame = () => {
  const [targetPokemon, setTargetPokemon] = useState('')
  const [guess, setGuess] = useState('')
  const [attempts, setAttempts] = useState(6)
  const [message, setMessage] = useState('')
  const [previousAttempts, setPreviousAttempts] = useState([])
  const [pokemonData, setPokemonData] = useState(null)

  useEffect(() => {
    generateRandomPokemon()
  }, [])

  const generateRandomPokemon = async () => {
  
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      const data = await response.json()
      const randomIndex = Math.floor(Math.random() * data.results.length)
      const randomPokemon = data.results[randomIndex].name
      setTargetPokemon(randomPokemon)

  }

  useEffect(() => {
    getPokemonData(targetPokemon)
  }, [targetPokemon])

  const getPokemonData = async (pokemonName) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      const data = await response.json();
      setPokemonData(data)

  };

  const handleGuess = () => {
    if (guess.toLowerCase() === targetPokemon.toLowerCase()) {
      setMessage('Correct pokemon!');
    } else {
      setAttempts((prevAttempts) => prevAttempts - 1)
      setMessage('Incorrect, try again!')
      setPreviousAttempts((prevAttempts) => [...prevAttempts, guess])

      if (attempts === 1) {
        setMessage(`you lose! The Pokemon was "${targetPokemon}".`)
      }
    }

    setGuess('')
  };

  const getLetterColor = (index, letter) => {
    if (targetPokemon.includes(letter)) {
      if (targetPokemon.indexOf(letter) === index) {
        return green[500]
      } else {
        return yellow[500]
      }
    }
    return 'default'
  };

  return (
    <div>
      <Typography variant="h4">Pokemon Wordle Game</Typography>
      <Typography variant="body1">Attempts Remaining: {attempts}</Typography>
      <TextField
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        variant="outlined"
        size="small"
        style={{ marginBottom: '5px' }}
      />
      <Grid container spacing={1}>
        {Array.from(targetPokemon).map((letter, index) => (
          <Grid item key={index}>
            <Button variant="contained">{guess[index] || ''}</Button>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        onClick={handleGuess}
        disabled={guess.length !== targetPokemon.length}
      >
        Guess
      </Button>
      <Typography variant="body1">{message}</Typography>
      <Typography variant="body1">Previous Attempts:</Typography>
      {previousAttempts.map((attempt, index) => (
        <div key={index}>
          {Array.from(attempt).map((letter, letterIndex) => (
            <Button
              variant="contained"
              key={letterIndex}
              style={{ backgroundColor: getLetterColor(letterIndex, letter) }}
              disabled
            >
              {letter}
            </Button>
          ))}
        </div>
      ))}
    </div>
  )
}

export default PokemonWordleGame;