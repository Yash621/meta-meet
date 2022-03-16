const express = require("express");
const http = require("http");
const app = express();
require("dotenv").config();
const server = http.createServer(app);
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));
const userRoutes = require("./routes/user");
const chatRoutes = require("./routes/chat");
const contactRoutes = require("./routes/contact");
const spaceRoutes = require("./routes/space");
const spaceChatRoutes = require("./routes/spaceChat");
var cors = require("cors");
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/users", userRoutes);
app.use("/chats", chatRoutes);
app.use("/contacts", contactRoutes);
app.use("/spaces", spaceRoutes);
app.use("/spacechats", spaceChatRoutes);

io.on("connection", (socket) => {
  socket.on("joinSpace", (data) => {
    console.log("joinSpace");
    socket.join(data.space);
  });
  socket.on("sendSpaceChat", (data) => {
    console.log("sendSpaceChat");
    io.to(data.space).emit("spaceChat", data);
  });
  socket.on("chatJoin", (data) => {
    socket.join(data.room);
    socket.join(data.id);
  });
  socket.on("sendChat", (data) => {
    io.to(data.room).emit("chatMessage", data);
  });
  socket.on("endCall", (data) => {
    socket.leave(data.meetingId);
    io.to(data.meetingId).emit("leftCall", {
      id: data.id,
    });
  });
  socket.on("createRoom", (data) => {
    console.log(data.roomId);
    socket.join(data.roomId);
  });
  socket.emit("me", {
    id: socket.id,
  });
  socket.on("meetingData", (data) => {
    console.log(data.roomId);
    try {
      socket.emit("Participants", {
        Participants: Object.keys(
          io.sockets.adapter.rooms[data.roomId].sockets
        ),
      });
    } catch {
      console.log("error");
    }
  });
  socket.on("joinMeeting", (data) => {
    console.log(data.host);
    socket.broadcast.to(data.host).emit("newJoin", {
      signal: data.signal,
      guestId: data.id,
      peer: data.peer,
      username: data.username,
    });
    console.log(data.roomId + " hello bro");
    try {
      if (
        !Object.keys(io.sockets.adapter.rooms[data.roomId].sockets).includes(
          data.id
        )
      ) {
        console.log("hello bro  " + data.id);
        socket.join(data.roomId);
      }
    } catch {
      console.log("error");
    }
  });
  socket.on("acceptCall", (data) => {
    console.log(data.id + " call accepted");
    socket.broadcast.to(data.guestId).emit("callAccepted", {
      signal: data.signal,
      id: data.id,
      peer: data.peer,
      username: data.username,
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello friend");
});

const port = process.env.PORT || 9000;
server.listen(port, () => console.log("server is running on port 5000"));
