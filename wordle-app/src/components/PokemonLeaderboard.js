import React from 'react'
import { Typography } from '@mui/material'

const PokemonLeaderboard = ({ leaderboardData }) => {
  return (
    <div>
      <Typography variant="body1" className="pokemon-wordle-leaderboard">
        Leaderboard:
      </Typography>
      {leaderboardData.length > 0 ? (
        <ul className="pokemon-wordle-leaderboard-list">
          {leaderboardData.map((entry, index) => (
            <li key={index} className="pokemon-wordle-leaderboard-item">{`Player Name: ${
              entry.player_name || 'N/A'
            }, Score: ${entry.score || 'N/A'}`}</li>
          ))}
        </ul>
      ) : (
        <Typography variant="body2" className="pokemon-wordle-leaderboard-item">
          No leaderboard data available.
        </Typography>
      )}
    </div>
  )
}

export default PokemonLeaderboard