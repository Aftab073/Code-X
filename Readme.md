<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Online Coding Editor with Terminal - README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      max-width: 900px;
      margin: 40px auto;
      padding: 0 20px;
      background: #f9f9f9;
      color: #222;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    code {
      font-family: Consolas, monospace;
      background: #eee;
      padding: 2px 6px;
      border-radius: 3px;
    }
    a {
      color: #3498db;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    ul {
      margin-top: 0;
    }
  </style>
</head>
<body>
  <h1>Online Coding Editor with Terminal</h1>
  <p>
    This is a minimal online coding editor application with a terminal to execute code and see output, built with <strong>React</strong> (frontend) and <strong>FastAPI</strong> (backend).
    The backend runs submitted code inside Docker containers for secure execution.
  </p>

  <h2>Features</h2>
  <ul>
    <li><strong>Code Editor</strong> with syntax highlighting (using Monaco Editor)</li>
    <li><strong>Terminal Output</strong> with real-time stdout/stderr display</li>
    <li>Supports <strong>Python code execution</strong> with input handling</li>
    <li>Runs code inside isolated <strong>Docker containers</strong> for security</li>
    <li>Displays <strong>error messages</strong> clearly in terminal output</li>
    <li>Supports <strong>dark/light theme toggle</strong> for better UX</li>
    <li>User-friendly UI with input/output in the same terminal window</li>
    <li>Easy-to-extend architecture for adding new languages or features</li>
  </ul>

  <h2>Project Structure</h2>
  <pre>
frontend/
├── src/
│   ├── components/
│   │   └── CodeEditor.jsx
│   ├── App.jsx
│   └── main.jsx
├── public/
├── package.json

backend/
├── app.py
├── Dockerfile
├── requirements.txt
└── temp/ (temporary code execution files)
  </pre>

  <h2>Setup and Run Locally</h2>
  <h3>Prerequisites</h3>
  <ul>
    <li>Node.js &amp; npm</li>
    <li>Python 3.8+</li>
    <li>Docker installed and running</li>
  </ul>

  <h3>Backend Setup</h3>
  <pre>
1. Navigate to the backend folder:
   <code>cd backend</code>

2. Create and activate a virtual environment:
   <code>python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate</code>

3. Install dependencies:
   <code>pip install -r requirements.txt</code>

4. Build Docker image:
   <code>docker build -t code-runner .</code>

5. Run the FastAPI server:
   <code>uvicorn app:app --reload</code>
  </pre>

  <h3>Frontend Setup</h3>
  <pre>
1. Navigate to the frontend folder:
   <code>cd frontend</code>

2. Install npm dependencies:
   <code>npm install</code>

3. Run the React development server:
   <code>npm run dev</code>

Open <a href="http://localhost:5173" target="_blank" rel="noopener noreferrer">http://localhost:5173</a> to use the editor.
  </pre>

  <h2>Usage</h2>
  <ul>
    <li>Write your Python code in the editor.</li>
    <li>If your program requires input, provide it in the terminal input area.</li>
    <li>Click <strong>Run</strong> to execute the code.</li>
    <li>See output or errors in the terminal below.</li>
    <li>Toggle between <strong>dark and light themes</strong> using the theme button.</li>
  </ul>

  

  <h2>Future Improvements</h2>
  <ul>
    <li>Support for multiple programming languages</li>
    <li>Saving and loading code snippets</li>
    <li>User authentication and history tracking</li>
    <li>Real-time collaboration with multiple users</li>
  </ul>

 

  <p>Feel free to contribute or open issues for any suggestions or bugs!</p>

  <hr />
  <p><strong>Happy Coding! 🚀</strong></p>
</body>
</html>
