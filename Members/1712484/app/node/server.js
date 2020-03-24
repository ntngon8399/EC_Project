const http = require("http");
const debug = require("debug")("node-angular");
const app = require("./app");

const normalizePort = val => {
    var port = parseInt(val, 10);
  
    //named pipe
    if (isNaN(port)) {
      return val;
    }
  
    //port number
    if (port >= 0) {
      return port;
    }
  
    return false;
  };
  
  const onError = error => {
    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof addr === "string" ? "pipe" + add : "port " + port;
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  
  const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe" + add : "port " + port;
    debug("Listening on " + bind);
  };
  
  const port = normalizePort( process.env.PORT || "3000");
  app.set("port", port);
  const server = http.createServer(app);
  server.on("error", onError);
  server.on("listening", onListening);
  
  // const server = http.createServer((req, res) => {
  //     res.end("res messenge");
  // });
  
  server.listen(port), () => {
    console.log("Server is running on port ${port}");
  };
  