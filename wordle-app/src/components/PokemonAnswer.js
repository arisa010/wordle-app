import React from 'react'
import { Typography } from '@mui/material'

const PokemonAnswer = ({ pokemonImage, targetPokemon }) => {
  return (
    <div className="pokemon-answer-container">
      {pokemonImage && (
        <img src={pokemonImage} alt={targetPokemon} className="pokemon-answer-image" />
      )}
      <Typography variant="body1" className="pokemon-answer-text">
        The answer is: {targetPokemon}
      </Typography>
    </div>
  )
}

export default PokemonAnswer