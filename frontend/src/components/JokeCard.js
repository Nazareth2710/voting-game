import React, { useState, useEffect } from 'react';

// Define the default emojis to use for reactions
const defaultEmojis = ["😂", "👍", "❤️"];

const JokeCard = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to augment a fetched joke with default emoji votes
  const augmentJoke = (jokeData) => {
    return {
      ...jokeData,
      availableVotes: defaultEmojis,
      votes: defaultEmojis.map(emoji => ({ label: emoji, value: 0 }))
    };
  };

  // Fetch a joke from the Teehee Joke API and augment it
  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://teehee.dev/api/joke');
      if (!res.ok) {
        throw new Error('Failed to fetch joke');
      }
      const data = await res.json();
      const augmentedJoke = augmentJoke(data);
      setJoke(augmentedJoke);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle a vote click for a specific emoji
  const handleVote = (emoji) => {
    const updatedVotes = joke.votes.map(vote => {
      if (vote.label === emoji) {
        return { ...vote, value: vote.value + 1 };
      }
      return vote;
    });
    setJoke({ ...joke, votes: updatedVotes });
  };

  useEffect(() => {
    fetchJoke();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!joke) return null;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{joke.question}</h2>
      <p className="mb-6 text-lg">{joke.answer}</p>
      <div className="flex justify-center space-x-4 mb-4">
        {joke.availableVotes.map((emoji) => {
          // Get the current vote count for this emoji
          const voteObj = joke.votes.find(v => v.label === emoji);
          const voteCount = voteObj ? voteObj.value : 0;
          return (
            <button
              key={emoji}
              onClick={() => handleVote(emoji)}
              className="flex flex-col items-center bg-gray-100 p-2 rounded hover:bg-gray-200 transition"
            >
              <span className="text-2xl">{emoji}</span>
              <span>{voteCount}</span>
            </button>
          );
        })}
      </div>
      <button
        onClick={fetchJoke}
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Next Joke
      </button>
    </div>
  );
};

export default JokeCard;
