import { useState } from "react";
import React from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);

  const handleRunCode = async () => {
    try {
      const res = await axios.post("https://code-x-afeu.onrender.com/run", {
        code,
        input,
      });

      if (res.data.error) {
        setOutput(res.data.error);
        setError(true);
      } else {
        setOutput(res.data.output);
        setError(false);
      }
    } catch (err) {
      setOutput("Server Error: " + err.message);
      setError(true);
    }
  };

  const handleClearCode = () => setCode("");
  const handleClearOutput = () => {
    setOutput("");
    setError(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 mb-4 justify-between">
        <button onClick={() => setCode('print("Hello, World!")')} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Load Example</button>
        <button onClick={handleClearCode} className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500">Clear Code</button>
        <button onClick={handleClearOutput} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Clear Output</button>
      </div>

      {/* Code Editor */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        placeholder="Write your Python code here"
        className="w-full p-3 rounded bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300"
      />

      {/* Input Box */}
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={4}
        placeholder="Optional input (for input())"
        className="w-full mt-4 p-3 rounded bg-gray-100 dark:bg-gray-800 dark:text-white border border-gray-300"
      />

      {/* Run Button */}
      <button
        onClick={handleRunCode}
        className="bg-green-600 text-white px-6 py-2 mt-4 rounded hover:bg-green-700"
      >
        Run ▶
      </button>

      {/* Output Box */}
      {output && (
        <div className={`mt-6 p-4 rounded border shadow 
            ${error
            ? "bg-red-100 text-red-800 border-red-400"
            : "bg-green-100 text-green-800 border-green-400"
          }`}>
          <h3 className="font-semibold mb-2">{error ? "Error Output:" : "Output:"}</h3>
          <pre className="whitespace-pre-wrap font-mono">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
