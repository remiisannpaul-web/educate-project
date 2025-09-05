"use client"

import { useState } from "react";
import { fetchCreateProgram } from "@/lib/fetch/fetchCreateProgram";

export default function AdminForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");
    
    try {
      const result = await fetchCreateProgram({
        title,
        description,
        price,
        duration,
        level,
        category,
      });

      if (result.success) {
        setSuccess(result.message);
        setTitle("");
        setDescription("");
        setPrice("");
        setDuration("");
        setLevel("");
        setCategory("");
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Create New Program
        </h1>

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="program-title" className="block text-gray-700 text-sm font-bold mb-2">
            Title
          </label>
          <input
            id="program-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter program title"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="program-description" className="block text-gray-700 text-sm font-bold mb-2">
            Description
          </label>
          <textarea
            id="program-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter program description"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="program-price" className="block text-gray-700 text-sm font-bold mb-2">
            Price ($)
          </label>
          <input
            id="program-price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter program price"
            required
          />
        </div>

        {/* Duration */}
        <div className="mb-4">
          <label htmlFor="program-duration" className="block text-gray-700 text-sm font-bold mb-2">
            Duration (e.g. 6 weeks)
          </label>
          <input
            id="program-duration"
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter duration"
            required
          />
        </div>

        {/* Level */}
        <div className="mb-4">
          <label htmlFor="program-level" className="block text-gray-700 text-sm font-bold mb-2">
            Level
          </label>
          <select
            id="program-level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label htmlFor="program-category" className="block text-gray-700 text-sm font-bold mb-2">
            Category
          </label>
          <input
            id="program-category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter category"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Program"}
        </button>
      </form>
    </div>
  );
}
