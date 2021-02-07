const express = require("express");
const { ExpressPeerServer } = require("peer");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const peerServer = ExpressPeerServer(server, {
  path: "/fireplace",
});

app.use("/peerjs", peerServer);
