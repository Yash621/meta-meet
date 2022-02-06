const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);
  socket.on("disconnect", () => {
    socket.broadcast.emit("callEnded");
  });
  socket.on("addToMeeting", (meetingId) => {
    socket.join(meetingId);
    console.log("hello");
  });
  socket.on("joinMeeting", (userData) => {
    // console.log(io.sockets.adapter.rooms[meetingId].sockets);
    socket.join(userData.host);
    io.to(data.host).emit("newJoin", {
      signal: userData.signalData,
    });
  });
  socket.on("callUser", (data) => {});

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
});

app.get("/", (req, res) => {
  res.send("Hello friend");
});

server.listen(5000, () => console.log("server is running on port 5000"));
