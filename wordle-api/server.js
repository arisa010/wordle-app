

const express = require('express');
const app = express();
const PORT = 3001;



app.listen(PORT, () => console.log(`Server is listening here: http://localhost:${PORT}`))

app.use(express.json())

app.get('/pokemon/:name', async (req, res) => {
  const pokemonName = req.params.name.toLowerCase()
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
  const data = await response.json()
  const randomIndex = Math.floor(Math.random() * data.results.length)
  const randomPokemon = data.results[randomIndex]
  res.json(randomPokemon.name)
  
    // 
  
})

     

if (process.env.NODE_ENV === 'production') {
  const path = require('path')
  app.use(express.static(path.join(__dirname, 'build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}