import React, { useState, useEffect } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { blue, green, yellow } from '@mui/material/colors'


//add home page instructions?
//addd log in?
//needd pokemon api, ddatabse save points
//


//game logic 
const PokemonWordleGame = () => {

    //hard code wpokemons
  const generateRandomPokemon = () => {
    const pokemon = ['pikachu', 'ditto', 'gardevoir', 'snorlax', 'lucario']
    const randomIndex = Math.floor(Math.random() * pokemon.length)
    return pokemon[randomIndex]
  }

  //fetchPokemon 
 // const res = fetch()

  const [targetPokemon, setTargetPokemon] = useState(generateRandomPokemon()) // randomly chosen target Pokemon
  const [guess, setGuess] = useState('') // users guesses
  const [attempts, setAttempts] = useState(6) //  attempts left
  const [message, setMessage] = useState('') //message to display to the user
  const [previousAttempts, setPreviousAttempts] = useState([]) //to store previous attempt
  useEffect(() => {
    setTargetPokemon(generateRandomPokemon())
    setGuess('')
    setAttempts(6)
    setMessage('')
    setPreviousAttempts([])
  }, [])

  const handleGuess = () => {
    // checks if the guess matches the target pokemon
    if (guess.toLowerCase() === targetPokemon.toLowerCase()) {
      setMessage('correct pokemon!!')
      // update leaderboard 
    } else {
      // traking away  attempts
      setAttempts((prevAttempts) => prevAttempts - 1)

      // if all attempts used
      if (attempts === 1) {
        setMessage(`wrong game over! The Pokemon was "${targetPokemon}".`)
        // update leader board accordingly
        setMessage('incorrect, try again!!')
        setPreviousAttempts((prevAttempts) => [...prevAttempts, guess])
      }
    }
  }

  const getLetterColor = (index, letter) => {
    if (targetPokemon.includes(letter)) {
      if (targetPokemon.indexOf(letter) === index) {
        return green[500] // correct letter in the right spot
      } else {
        return yellow[500] //  correct letter in the wrong spot
      }
    }
    return 'default' 
  }

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
            <Button variant="contained" >
              {guess[index] || ''}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" onClick={handleGuess} disabled={guess.length !== targetPokemon.length}>
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

export default PokemonWordleGame