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
  socket.on("createRoom", (data) => {
    console.log(data.roomId);
    socket.join(data.roomId);
    console.log(Object.keys(io.sockets.adapter.rooms[data.roomId].sockets));
  });
  socket.emit("me", {
    id: socket.id,
  });
  socket.on("meetingData", (data) => {
    console.log(data.roomId);
    socket.emit("Participants", {
      Participants: Object.keys(io.sockets.adapter.rooms[data.roomId].sockets),
    });
  });
  socket.on("joinMeeting", (data) => {
    console.log(data.host);
    socket.broadcast.to(data.host).emit("newJoin", {
      signal: data.signal,
      guestId: data.id,
    });
    // socket.broadcast.to(data.host).emit("helloworld", {
    //   message: "hello my name is yash",
    // });
    // console.log("hello my name is yash");
    // Object.keys(io.sockets.adapter.rooms[data.host].sockets).forEach(
    //   (socketId) => {
    //     console.log(socketId);
    //     socket.to(socketId).emit("newJoin", {
    //       signal: data.signal,
    //       guestId: data.id,
    //     });
    //   }
    // );
    console.log(data.roomId + " hello bro");
    if (
      !Object.keys(io.sockets.adapter.rooms[data.roomId].sockets).includes(
        data.id
      )
    ) {
      console.log("hello bro  " + data.id);
      socket.join(data.roomId);
    }
  });
  socket.on("acceptCall", (data) => {
    socket.broadcast.to(data.guestId).emit("callAccepted", {
      signal: data.signal,
      id: data.id,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello friend");
});

server.listen(5000, () => console.log("server is running on port 5000"));
