import React from "react";

/**
 * Reusable Skeleton loader
 * Dapat digunakan di mode grid atau flex untuk mensimulasikan konten yang sedang dimuat
 * @param {string} className Tambahan class Tailwind, misalnya: w-full h-8, rounded-lg, dll.
 */
export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-300 rounded ${className}`}
    ></div>
  );
}
