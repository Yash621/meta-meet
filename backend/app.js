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

  socket.on("joinMeeting", (userData) => {
    // console.log(io.sockets.adapter.rooms[meetingId].sockets);
    console.log("joinMeeting");
    socket.join(userData.host);
    console.log(userData.host);
    io.to(userData.host).emit("newJoin", {
      signal: userData.signalData,
      userId: userData.userId,
    });
  });
  socket.on("acceptCall", (data) => {
    console.log("acceptcall");
    console.log(data.userId + "userId");
    console.log(data.signalData + "signalData");
    io.to(data.userId).emit("callAccepted", {
      signal: data.signalData,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello friend");
});

server.listen(5000, () => console.log("server is running on port 5000"));
