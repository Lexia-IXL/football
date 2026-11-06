const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, game: "College Football Dynasty", version: "0.1.0" });
});

// Lightweight room foundation. Persistent league data and verified account
// authorization are added in the next backend milestone.
const rooms = new Map();

io.on("connection", (socket) => {
  socket.emit("server:ready", { socketId: socket.id });

  socket.on("league:join", ({ code, teamName } = {}) => {
    if (typeof code !== "string" || !/^[A-Z0-9-]{4,16}$/i.test(code)) {
      socket.emit("league:error", "Enter a valid season code.");
      return;
    }
    const normalized = code.toUpperCase();
    socket.join(normalized);
    if (!rooms.has(normalized)) rooms.set(normalized, new Set());
    rooms.get(normalized).add(socket.id);
    socket.data.leagueCode = normalized;
    socket.to(normalized).emit("league:member-joined", {
      socketId: socket.id,
      teamName: String(teamName || "Coach").slice(0, 32)
    });
    socket.emit("league:joined", { code: normalized });
  });

  socket.on("disconnect", () => {
    const code = socket.data.leagueCode;
    if (code && rooms.has(code)) {
      rooms.get(code).delete(socket.id);
      socket.to(code).emit("league:member-left", { socketId: socket.id });
      if (rooms.get(code).size === 0) rooms.delete(code);
    }
  });
});

server.listen(PORT, () => console.log(`College Football Dynasty running on ${PORT}`));