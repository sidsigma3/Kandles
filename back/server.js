const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const httpServer = require("http").createServer(app);
app.use(express.json());
app.use(cors());

const socketIO = require("socket.io");
const io = socketIO(httpServer, {
  cors: {
    origin: "https://kandles.onrender.com",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

const routeurl = require("./route")(io);
app.use("/", routeurl);
// io.on("connection", (socket) => {
//   console.log("Client connected");

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

httpServer.listen(port, () => {
  console.log("Server is running on port "+port );
});
