import { useState, useEffect } from "react";

export const useLocalStorage = (initial_data) => {
  const [notes, setNotes] = useState(() => {
    const item = localStorage.getItem("key");
    return item ? JSON.parse(item) : initial_data;
  });

  useEffect(() => {
    localStorage.setItem("key", JSON.stringify(notes));
  }, [notes]);

  return [notes, setNotes];
};
