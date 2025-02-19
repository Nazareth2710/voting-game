import React, { useState, useEffect } from 'react';

// Define the default emojis to use for reactions (for reference)
const defaultEmojis = ["😂", "👍", "❤️"];

const JokeCard = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch a joke from your backend
  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      // Change the URL to your backend endpoint
      const res = await fetch('http://localhost:5000/api/joke');
      if (!res.ok) {
        throw new Error('Failed to fetch joke');
      }
      const data = await res.json();
      setJoke(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle a vote click for a specific emoji
  const handleVote = async (emoji) => {
    try {
      // Send a POST request to update the vote
      const res = await fetch(`http://localhost:5000/api/joke/${joke.jokeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji }),
      });
      if (!res.ok) {
        throw new Error('Failed to update vote');
      }
      const updatedJoke = await res.json();
      setJoke(updatedJoke);
    } catch (err) {
      console.error(err);
      // Optionally, you can set an error state here if desired
    }
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
          // Get the current vote count for this emoji from the joke data returned by the backend
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
