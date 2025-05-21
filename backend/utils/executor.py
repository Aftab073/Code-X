def execute_python_code(code: str, user_input: str = "") -> str:
    """Execute Python code in a secure environment with resource limits"""
    os.makedirs("temp", exist_ok=True)
    filename = f"temp/{uuid.uuid4()}.py"

    try:
        # Write user code to file
        with open(filename, "w") as f:
            f.write(code)

        # Prepare the subprocess
        process = subprocess.Popen(
            ["python", filename],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            creationflags=subprocess.CREATE_NEW_PROCESS_GROUP if platform.system() == "Windows" else 0
        )

        # Set platform-specific limits
        if platform.system() == "Windows":
            set_windows_limits(process)

        try:
            # Combine the code and input with markers
            full_input = user_input.replace('\\n', '\n') if user_input else ""
            
            stdout, stderr = process.communicate(
                input=full_input,
                timeout=10
            )
            
            # Check return code
            if process.returncode != 0:
                error_msg = stderr if stderr else f"Process exited with code {process.returncode}"
                return f"❌ Error: {error_msg}"
                
            return stdout

        except subprocess.TimeoutExpired:
            if platform.system() == "Windows":
                os.kill(process.pid, signal.CTRL_BREAK_EVENT)
            else:
                os.killpg(os.getpgid(process.pid), signal.SIGKILL)
            return "❌ Error: Code execution timed out (10s limit)."
            
    except Exception as e:
        logger.error(f"Execution failed: {str(e)}")
        return f"❌ Unexpected Error: {str(e)}"
        
    finally:
        try:
            if os.path.exists(filename):
                os.remove(filename)
        except Exception as e:
            logger.error(f"Failed to clean up file {filename}: {str(e)}")