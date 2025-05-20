import subprocess
import uuid
import os

def execute_python_code(code: str, user_input: str = "") -> str:
    # Make sure temp dir exists
    os.makedirs("temp", exist_ok=True)

    filename = f"temp/{uuid.uuid4()}.py"

    try:
        # Write user code to file
        with open(filename, "w") as f:
            f.write(code)

        # Run the code using subprocess
        process = subprocess.Popen(
            ["python", filename],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )

        try:
            stdout, stderr = process.communicate(input=user_input, timeout=10)
        except subprocess.TimeoutExpired:
            process.kill()
            return "❌ Error: Code took too long to execute (Timeout)."

        return stderr if stderr else stdout

    except Exception as e:
        return f"❌ Unexpected Error: {str(e)}"
    finally:
        # Clean up the file
        if os.path.exists(filename):
            os.remove(filename)



