// https://devdocs.io/express/
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const fs = require("fs");

const env = process.env.ENV || "dev";
const config = JSON.parse(fs.readFileSync(`config/${env}.json`));

// routes
LobbyAPI(app, io);

app.use("/", express.static("../game"));
app.use("*", express.static("../game"));

http.listen(config.port, config.url, () => {
    console.log(`Server started listening on http://${config.url}:${config.port}`);
});