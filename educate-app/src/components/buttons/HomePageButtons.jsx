"use client";

export function InteractiveButton({ children, onClick }) {
  return (
    <button
      type="button"
      className="font-medium hover:text-blue-200 transition-colors cursor-pointer"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
