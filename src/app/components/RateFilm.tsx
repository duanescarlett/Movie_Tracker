"use client";
import { useState } from "react";
import rateFilm from "@/buslogic/addRating";

interface RateFilmProps {
  movieId: string;
  userId?: string; // Optional if the user is not logged in
}

const RateFilm: React.FC<RateFilmProps> = ({ movieId, userId }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === null) {
      setMessage("Please select a rating.");
      return;
    }

    try {
      const response = await rateFilm(rating, userId || "", movieId);
      if (typeof response === "string") {
        setMessage(`Error: ${response}`);
      } else {
        setMessage("Rating submitted successfully!");
      }
    } catch (error) {
      setMessage("An error occurred while submitting your rating.");
    }
  };

  return (
    <div className="rate-film">
      <h3 className="text-lg font-bold">Rate this Film</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rating" className="block text-sm font-medium">
          Select a rating (1-10):
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="10"
          value={rating || ""}
          onChange={(e) => setRating(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit Rating
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
  );
};

export default RateFilm;