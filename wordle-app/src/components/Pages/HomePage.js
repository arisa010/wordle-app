
import React, { useState } from 'react';
import { Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
	const navigate = useNavigate();
  
	const handleStartGame = () => {
	  navigate('/game');
	};
  
	return (
	  <div>
		<Typography variant="h4">Home Page</Typography>
		<Typography variant="body1">Welcome to the Pokemon Wordle Game!</Typography>
		<Typography variant="body1">Instructions: kjnsd</Typography>
		<Button variant="contained" onClick={handleStartGame}>Start Game</Button>
	  </div>
	);
  };

export default HomePage;
