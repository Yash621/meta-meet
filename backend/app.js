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
  // socket.on("disconnect", () => {
  //   socket.broadcast.emit("callEnded");
  // });
  socket.on("joinMeeting", (data) => {
    // console.log(io.sockets.adapter.rooms[meetingId].sockets);
    console.log("joinMeeting");
    socket.join(data.host);
    console.log(data.host);
    socket.to(data.host).emit("newJoin", {
      signal: data.signal,
      guestId: data.id,
    });
  });
  socket.on("acceptCall", (data) => {
    console.log("acceptcall");
    console.log(data.guestId + "guestId");
    console.log(data.signal + "signalData");
    socket.to(data.guestId).emit("callAccepted", {
      signal: data.signal,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello friend");
});

server.listen(5000, () => console.log("server is running on port 5000"));
