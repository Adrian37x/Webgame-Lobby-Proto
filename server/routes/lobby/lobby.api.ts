const path = require("path");

const LobbyAPI = (app, io) => {
    const lobbyService = new SocketLobbyService();

    io.on("connect", socket => {
        socket.on("join", (room) => {
            lobbyService.join(room, socket.id);
        });

        socket.on("message", (data) => {
            if (data.room) {
                lobbyService.broadcast(io, socket.id, "message", data.message);
            } else {
                io.sockets.emit("message", data.message);
            }
        });

        socket.on("disconnect", () => {
            lobbyService.leave(socket.id);
        });
    });

    // host
    app.get("/lobby", (req, res) => {
        let token = "";

        do {
            token = Buffer.from((Math.random() * Math.random()).toString().slice(3)).toString("base64").slice(0, 12);
        } while (lobbyService.getLobbyByToken(token));

        lobbyService.create(token);

        res.redirect(`/lobby/${token}`);
    });

    // join
    app.get("/lobby/:lobbytoken", (req, res) => {
        const token = req.params.lobbytoken;

        if (lobbyService.getLobbyByToken(token)) {
            res.sendFile(path.join(__dirname, "../game"));
        } else {
            res.status(400).send("Lobby does not exist");
        }
    });
}