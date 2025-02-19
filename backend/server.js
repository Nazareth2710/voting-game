const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

const jokeSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  votes: [
    {
      label: { type: String, required: true },
      value: { type: Number, default: 0 },
    },
  ],
  availableVotes: [String],
});

const Joke = mongoose.model('Joke', jokeSchema);

const defaultEmojis = ["😂", "👍", "❤️"];

// GET /api/joke
app.get('/api/joke', async (req, res) => {
    try {
      const response = await fetch('https://teehee.dev/api/joke');
      if (!response.ok) throw new Error('Failed to fetch joke from TeeHee API');
      const data = await response.json();

      const existingJoke = await Joke.findOne({ 
        question: data.question, 
        answer: data.answer 
      });
  
      if (existingJoke) {
        return res.json(existingJoke);
      } else {
        const newJoke = new Joke({
          question: data.question,
          answer: data.answer,
          votes: defaultEmojis.map(emoji => ({ label: emoji, value: 0 })),
          availableVotes: defaultEmojis,
        });
        
        await newJoke.save();
        return res.json(newJoke);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server Error' });
    }
  });
  

// POST /api/joke/
app.post('/api/joke/:id', async (req, res) => {
  const { id } = req.params;
  const { emoji } = req.body;

  try {
    const joke = await Joke.findById(id);
    if (!joke) return res.status(404).json({ error: 'Joke not found' });

    if (!joke.availableVotes.includes(emoji)) {
      return res.status(400).json({ error: 'Invalid emoji vote' });
    }

    joke.votes = joke.votes.map(vote => {
      if (vote.label === emoji) {
        return { ...vote.toObject(), value: vote.value + 1 };
      }
      return vote;
    });

    await joke.save();
    res.json(joke);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
