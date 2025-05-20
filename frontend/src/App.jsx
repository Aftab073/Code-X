import React, { useState, useEffect } from "react";
import CodeEditor from "./components/CodeEditor";

const App = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white dark:bg-gray-900 text-black dark:text-white ">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow"
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      <h1 className="text-3xl font-bold text-center pt-8 pb-4">
        Code-X Editor 🚀
      </h1>
      <CodeEditor />
    </div>
  );
};

export default App;
