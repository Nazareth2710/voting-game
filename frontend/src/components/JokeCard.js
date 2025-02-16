// frontend/src/components/JokeCard.js
import React, { useState, useEffect } from 'react';

const JokeCard = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJoke = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('https://teehee.dev/api/joke');
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

  useEffect(() => {
    fetchJoke();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!joke) return null;

  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">{joke.question}</h2>
      <p className="mb-4">{joke.answer}</p>
      <button
        onClick={fetchJoke}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Next Joke
      </button>
    </div>
  );
};

export default JokeCard;
