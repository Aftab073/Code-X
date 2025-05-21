import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FiCopy, FiMaximize2 } from "react-icons/fi";
import { FaPlay, FaTimes, FaBroom, FaFileAlt } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRunCode = async () => {
    setLoading(true);
    setOutput("");
    setError(false);

    try {
      const res = await axios.post("https://code-x-afeu.onrender.com/run", {
        code,
        input,
        language: "python",
      });

      if (res.data.error) {
        setOutput(res.data.error);
        setError(true);
      } else {
        setOutput(res.data.output);
        setError(false);
      }
    } catch (err) {
      setOutput("❌ Server Error: " + err.message);
      setError(true);
    }

    setLoading(false);
  };

  const handleClearCode = () => setCode("");
  const handleClearOutput = () => {
    setOutput("");
    setError(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <motion.div 
      className={`max-w-6xl mx-auto p-4 transition-all duration-300 ${isExpanded ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 p-0' : ''}`}
      layout
    >
      <div className={`${isExpanded ? 'h-screen overflow-auto p-6' : ''}`}>
        {/* Header */}
        <motion.div 
          className="flex justify-between items-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Python Code Runner
          </h1>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            <FiMaximize2 className="text-gray-600 dark:text-gray-300" />
          </button>
        </motion.div>

        {/* Toolbar */}
        <motion.div
          className="flex flex-wrap gap-3 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <motion.button
            onClick={() => setCode('print("Hello, World!")')}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaFileAlt />
            Load Example
          </motion.button>
          <motion.button
            onClick={handleClearCode}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaBroom />
            Clear Code
          </motion.button>
          <motion.button
            onClick={handleClearOutput}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaTimes />
            Clear Output
          </motion.button>
        </motion.div>

        {/* Code Editor */}
        <motion.div 
          className="relative mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <button
              onClick={handleCopyCode}
              className="p-1.5 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition"
              title="Copy code"
            >
              <FiCopy className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
          <motion.textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={isExpanded ? 25 : 15}
            placeholder="# Write your Python code here\nprint('Hello World!')"
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-transparent font-mono text-sm shadow-sm transition-all resize-none"
          />
        </motion.div>

        {/* Input Box */}
        <motion.div 
          className="relative mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input line by line (optional):
          </label>
          <motion.textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={3}
            placeholder="Enter input values here (one per line)"
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-400 focus:border-transparent font-mono text-sm shadow-sm transition-all resize-none"
          />
        </motion.div>

        {/* Run Button */}
        <motion.div className="flex justify-center mb-6">
          <motion.button
            onClick={handleRunCode}
            disabled={loading}
            className={`flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all ${
              loading ? "opacity-80 cursor-not-allowed" : ""
            }`}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <>
                <ImSpinner8 className="animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <FaPlay />
                Run Code
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Output Box */}
        <AnimatePresence>
          {output && (
            <motion.div
              className={`relative rounded-xl shadow-lg overflow-hidden ${
                error
                  ? "bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800"
                  : "bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800"
              }`}
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-3 right-3 flex gap-2 z-10">
                <button
                  onClick={handleCopyOutput}
                  className="p-1.5 bg-white dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                  title="Copy output"
                >
                  <FiCopy className="text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <div className="p-4">
                <h3 className={`font-semibold mb-3 flex items-center gap-2 ${
                  error ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"
                }`}>
                  {error ? (
                    <span className="text-xl">❌</span>
                  ) : (
                    <span className="text-xl">✅</span>
                  )}
                  {error ? "Execution Error" : "Execution Successful"}
                </h3>
                <pre className="whitespace-pre-wrap font-mono text-sm bg-white dark:bg-gray-800/50 p-3 rounded-lg overflow-x-auto">
                  {output}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default CodeEditor;