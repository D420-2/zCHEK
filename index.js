const { spawn } = require("child_process");
const axios = require("axios");
const express = require("express");
const path = require("path");

let logger;
try {
  logger = require(path.join(__dirname, "SIDDIK/catalogs/utils/log.js"));
} catch (error) {
  console.error("Logger module not found. Make sure 'log.js' exists in the correct path.");
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 8080;
global.countRestart = 0; 

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "SIDDIK/catalogs/website/siddik.html");
  res.sendFile(filePath, (err) => {
    if (err) {
      logger(`Failed to send HTML file: ${err.message}`, "[ ERROR ]");
      res.status(500).send("Internal Server Error");
    }
  });
});

app.listen(port, () => {
  logger(`Server is running on port ${port}...`, "[ STARTING ]");
}).on("error", (err) => {
  if (err.code === "EACCES") {
    logger(`Permission denied. Cannot bind to port ${port}.`, "[ ERROR ]");
  } else if (err.code === "EADDRINUSE") {
    logger(`Port ${port} is already in use. Try a different port.`, "[ ERROR ]");
  } else {
    logger(`Server error: ${err.message}`, "[ ERROR ]");
  }
});

function startBot(message) {
  if (message) logger(message, "[ STARTING ]");

  const botProcess = spawn("node", ["--trace-warnings", "--async-stack-traces", "SIDDIK/catalogs/siddika.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true,
  });

  botProcess.on("close", (code) => {
    if (code !== 0 && global.countRestart < 5) {
      global.countRestart++;
      logger(`Bot exited with code ${code}. Restarting... (${global.countRestart}/5)`, "[ RESTARTING ]");
      setTimeout(startBot, 3000); 
    } else {
      logger(`Bot stopped after ${global.countRestart} restarts.`, "[ STOPPED ]");
    }
  });

  botProcess.on("error", (error) => {
    logger(`An error occurred: ${error.message}`, "[ ERROR ]");
  });
}

axios
  .get("https://raw.githubusercontent.com/D420-2/Ok/refs/heads/main/package.json")
  .then((response) => {
    const { name, version, description } = response.data;
    logger(`Package Name: ${name}`, "[ NAME ]");
    logger(`Version: ${version}`, "[ VERSION ]");
    logger(`Description: ${description}`, "[ DESCRIPTION ]");
  })
  .catch((error) => {
    logger(`Failed to fetch update info: ${error.message}`, "[ UPDATE ERROR ]");
  });

startBot();
