


// import React, { useState, useEffect } from 'react';
// import { Button, Grid, TextField, Typography } from '@mui/material';
// import { green, yellow } from '@mui/material/colors';

// // import { Particles } from 'react-tsparticles';

// import './Game.css'; // Import custom CSS for pixel art styling


// const PokemonWordleGame = () => {
//   const [attempts, setAttempts] = useState(6);
//   const [guess, setGuess] = useState('');
//   const [message, setMessage] = useState('');
//   const [previousAttempts, setPreviousAttempts] = useState([]);
//   const [targetPokemon, setTargetPokemon] = useState('');
//   const [playerName, setPlayerName] = useState('');
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const [pokemonImage, setPokemonImage] = useState('');

//   useEffect(() => {
//     fetchRandomPokemon();
//   }, []);

//   useEffect(() => {
//     fetchPokemonImage();
//   }, [targetPokemon]);

//   const fetchRandomPokemon = async () => {
//     try {
//       const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
//       const data = await response.json();
//       const pokemonList = data.results;
//       const randomIndex = Math.floor(Math.random() * pokemonList.length);
//       const randomPokemon = pokemonList[randomIndex].name;
//       console.log(randomPokemon);
//       setTargetPokemon(randomPokemon);
//     } catch (error) {
//       console.error('Error fetching random Pokemon:', error);
//     }
//   };

//   const fetchPokemonImage = async () => {
//     try {
//       if (targetPokemon) {
//         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${targetPokemon}`);
//         const data = await response.json();
//         const pokemonImageUrl = data.sprites.front_default;
//         setPokemonImage(pokemonImageUrl);
//       }
//     } catch (error) {
//       console.error('Error fetching Pokemon image:', error);
//     }
//   };


//   const handleGuess = () => {
//     if (guess.length !== targetPokemon.length) {
//       setMessage('Please enter a valid guess.');
//       return;
//     }

//     let correctPositions = [];

//     if (attempts === 1) {
//       setMessage(`You lost! The Pokemon was "${targetPokemon}".`);
//       setAttempts(0);
//       setGuess(targetPokemon);
//       setGameOver(true);
//       return;
//     }

//     const currentAttempt = Array.from(guess.toLowerCase());
//     const wrongPositions = [];

//     for (let i = 0; i < targetPokemon.length; i++) {
//       if (targetPokemon[i] === currentAttempt[i]) {
//         correctPositions.push(i);
//       } else if (targetPokemon.includes(currentAttempt[i])) {
//         wrongPositions.push(i);
//       }
//     }

//     const attempt = currentAttempt.map((letter, index) => {
//       if (correctPositions.includes(index)) {
//         return { letter, color: green[500] };
//       } else if (wrongPositions.includes(index)) {
//         return { letter, color: yellow[500] };
//       } else {
//         return { letter, color: 'default' };
//       }
//     });

//     setPreviousAttempts([...previousAttempts, attempt]);
//     setGuess('');
//     setAttempts(attempts - 1);

//     if (correctPositions.length === targetPokemon.length) {
//       handleWin();
//     } else if (attempts === 1) {
//       handleLoss();
//     }
//   };

//   const handleWin = async () => {
//     try {
//       await fetch('http://localhost:3001/score', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           playerName,
//           score: 10,
//         }),
//       });

//       setMessage('Congratulations! You won!');
//       fetchLeaderboard();
//       setGameOver(true);
//     } catch (error) {
//       console.error('Error saving score:', error);
//     }
//   };

//   const handleLoss = () => {
//     setMessage(`You lost! The Pokemon was "${targetPokemon}".`);
//     setGuess(targetPokemon);
//     setGameOver(true);
//   };

//   const fetchLeaderboard = async () => {
//     try {
//       const response = await fetch('http://localhost:3001/leaderboard');
//       const leaderboardData = await response.json();
//       setLeaderboardData(leaderboardData);
//     } catch (error) {
//       console.error('Error fetching leaderboard:', error);
//     }
//   };

//   const handleRestart = () => {
//     setMessage('');
//     setPreviousAttempts([]);
//     setAttempts(6);
//     setGuess('');
//     setGameOver(false);
//     fetchRandomPokemon();
//   };

//   const getLetterColor = (index, letter) => {
//     if (targetPokemon.includes(letter)) {
//       if (targetPokemon.indexOf(letter) === index) {
//         return green[500];
//       } else {
//         return yellow[500];
//       }
//     }
//     return 'default';
//   };



//   return (
    
//     <div className="pokemon-wordle-game">
      
//       <Typography variant="h4" className="pokemon-wordle-title">
//         Pokemon Wordle Game
//       </Typography>
//       <Typography variant="body1" className="pokemon-wordle-attempts">
//         Attempts Remaining: {attempts}
//       </Typography>
//       <TextField
//         value={guess}
//         onChange={(e) => setGuess(e.target.value)}
//         variant="outlined"
//         size="small"
//         className="pokemon-wordle-input"
//         disabled={gameOver} // Disable input during game over
//       />
//       <TextField
//         value={playerName}
//         onChange={(e) => setPlayerName(e.target.value)}
//         variant="outlined"
//         size="small"
//         label="Player Name"
//         className="pokemon-wordle-input"
//         disabled={gameOver} // Disable input during game over
//       />
//       <Grid container spacing={1}>
//         {Array.from(targetPokemon).map((letter, index) => (
//           <Grid item key={index}>
//             <Button variant="contained" disabled className="pokemon-wordle-letter">
//               {guess[index] || ''}
//             </Button>
//           </Grid>
//         ))}
//       </Grid>
//       <Button
//         variant="contained"
//         onClick={handleGuess}
//         disabled={guess.length !== targetPokemon.length || gameOver} // Disable during game over
//         className="pokemon-wordle-button"
//       >
//         Guess
//       </Button>
//       <Button variant="contained" onClick={handleRestart} style={{ marginLeft: '10px' }} className="pokemon-wordle-button">
//         Restart
//       </Button>
//       <Typography variant="body1" className="pokemon-wordle-message">
//         {message}
//       </Typography>
//       <Typography variant="body1" className="pokemon-wordle-attempts">
//         Previous Attempts:
//       </Typography>
//       {previousAttempts.map((attempt, index) => (
//         <div key={index} className="pokemon-wordle-attempt">
//           {attempt.map((letter, letterIndex) => (
//             <Button
//               variant="contained"
//               key={letterIndex}
//               style={{ backgroundColor: letter.color }}
//               disabled
//               className="pokemon-wordle-letter"
//             >
//               {letter.letter}
//             </Button>
//           ))}
//               {gameOver && (
//         <div className="pokemon-answer-container">
//           {pokemonImage && (
//             <img src={pokemonImage} alt={targetPokemon} className="pokemon-answer-image" />
//           )}
//           <Typography variant="body1" className="pokemon-answer-text">
//             The answer is: {targetPokemon}
//           </Typography>
//         </div>
//       )}

          
//         </div>
//       ))}
//       <Typography variant="body1" className="pokemon-wordle-leaderboard">
//         Leaderboard:
//       </Typography>
//       {leaderboardData.length > 0 ? (
//         <ul className="pokemon-wordle-leaderboard-list">
//           {leaderboardData.map((entry, index) => (
//             <li key={index} className="pokemon-wordle-leaderboard-item">{`Player Name: ${entry.player_name || 'N/A'}, Score: ${
//               entry.score || 'N/A'
//             }`}</li>
//           ))}
//         </ul>
//       ) : (
//         <Typography variant="body2" className="pokemon-wordle-leaderboard-item">
//           No leaderboard data available.
//         </Typography>
//       )}
//     </div>
//   );
// };

// export default PokemonWordleGame;

import React, { useState, useEffect } from 'react'
import { Button, Grid, TextField, Typography } from '@mui/material'
import { green, yellow } from '@mui/material/colors'
import PokemonAnswer from './PokemonAnswer'
import PokemonLeaderboard from './PokemonLeaderboard'

import './Game.css'

const PokemonWordleGame = () => {
  const [attempts, setAttempts] = useState(6)
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [previousAttempts, setPreviousAttempts] = useState([])
  const [targetPokemon, setTargetPokemon] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [leaderboardData, setLeaderboardData] = useState([])
  const [pokemonImage, setPokemonImage] = useState('')

  useEffect(() => {
    fetchRandomPokemon()
  }, []);

  useEffect(() => {
    fetchPokemonImage()
  }, [targetPokemon])

  const fetchRandomPokemon = async () => {
    
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
      const data = await response.json()
      const pokemonList = data.results
      const randomIndex = Math.floor(Math.random() * pokemonList.length)
      const randomPokemon = pokemonList[randomIndex].name

      console.log(randomPokemon)
      setTargetPokemon(randomPokemon)
  
  }

  const fetchPokemonImage = async () => {
    if (targetPokemon) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${targetPokemon}`)
      const data = await response.json()
      const pokemonImageUrl = data.sprites.front_default
      setPokemonImage(pokemonImageUrl)
    }
  }

  const handleGuess = () => {
    if (guess.length !== targetPokemon.length) {
      setMessage('Please enter a valid guess.')
      return
    }

    let correctPositions = []

    if (attempts === 1) {
      setMessage(`You lost! The Pokemon is "${targetPokemon}".`)
      setAttempts(0)
      setGuess(targetPokemon)
      setGameOver(true)
      return
    }

    const currentAttempt = Array.from(guess.toLowerCase())
    const wrongPositions = []

    for (let i = 0; i < targetPokemon.length; i++) {
      if (targetPokemon[i] === currentAttempt[i]) {
        correctPositions.push(i)
      } else if (targetPokemon.includes(currentAttempt[i])) {
        wrongPositions.push(i)
      }
    }

    const attempt = currentAttempt.map((letter, index) => {
      if (correctPositions.includes(index)) {
        return { letter, color: green[500] }
      } else if (wrongPositions.includes(index)) {
        return { letter, color: yellow[500] }
      } else {
        return { letter, color: 'default' }
      }
    })

    setPreviousAttempts([...previousAttempts, attempt])
    setGuess('')
    setAttempts(attempts - 1)

    if (correctPositions.length === targetPokemon.length) {
      handleWin()
    } else if (attempts === 1) {
      handleLoss()
    }
  }

  const handleWin = async () => {
   
      await fetch('http://localhost:3001/score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName,
          score: 10,
        }),
      })

      setMessage('Congratulations! You won!')
      fetchLeaderboard()
      setGameOver(true)
    
  }

  const handleLoss = () => {
    setMessage(`You lost! The Pokemon was "${targetPokemon}".`)
    setGuess(targetPokemon)
    setGameOver(true)
  }

  const fetchLeaderboard = async () => {
   
      const response = await fetch('http://localhost:3001/leaderboard')
      const leaderboardData = await response.json()
      setLeaderboardData(leaderboardData)
  
  }

  const handleRestart = () => {
    setMessage('')
    setPreviousAttempts([])
    setAttempts(6)
    setGuess('')
    setGameOver(false)
    fetchRandomPokemon()
  }

  const getLetterColor = (index, letter) => {
    if (targetPokemon.includes(letter)) {
      if (targetPokemon.indexOf(letter) === index) {
        return green[500]
      } else {
        return yellow[500]
      }
    }
    return 'default'
  }

  return (
    <div className="pokemon-wordle-game">
      <Typography variant="h4" className="pokemon-wordle-title">
        Pokemon Wordle Game
      </Typography>
      <Typography variant="body1" className="pokemon-wordle-attempts">
        Attempts Remaining: {attempts}
      </Typography>
      <TextField
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        variant="outlined"
        size="small"
        className="pokemon-wordle-input"
        disabled={gameOver}
      />
      <TextField
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        variant="outlined"
        size="small"
        label="Player Name"
        className="pokemon-wordle-input"
        disabled={gameOver}
      />
      <Grid container spacing={1}>
        {Array.from(targetPokemon).map((letter, index) => (
          <Grid item key={index}>
            <Button variant="contained" disabled className="pokemon-wordle-letter">
              {guess[index] || ''}
            </Button>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        onClick={handleGuess}
        disabled={guess.length !== targetPokemon.length || gameOver}
        className="pokemon-wordle-button"
      >
        Guess
      </Button>
      <Button variant="contained" onClick={handleRestart} style={{ marginLeft: '10px' }} className="pokemon-wordle-button">
        Restart
      </Button>
      <Typography variant="body1" className="pokemon-wordle-message">
        {message}
      </Typography>
      <Typography variant="body1" className="pokemon-wordle-attempts">
        Previous Attempts:
      </Typography>
      {previousAttempts.map((attempt, index) => (
        <div key={index} className="pokemon-wordle-attempt">
          {attempt.map((letter, letterIndex) => (
            <Button
              variant="contained"
              key={letterIndex}
              style={{ backgroundColor: letter.color }}
              disabled
              className="pokemon-wordle-letter"
            >
              {letter.letter}
            </Button>
          ))}
        </div>
      ))}
      {gameOver && (
        <PokemonAnswer pokemonImage={pokemonImage} targetPokemon={targetPokemon} />
      )}
      <PokemonLeaderboard leaderboardData={leaderboardData} />
    </div>
  )
}

export default PokemonWordleGame