class SocketLobbyService {
    private lobbies: Lobby[] = [];

    getLobbyByToken(lobbyToken: string) {
        return this.lobbies.find(l => l.token == lobbyToken);
    }

    getLobbyBySocket(socketId: string) {
        return this.lobbies.find(l => l.socketIds.includes(socketId));
    }

    create(lobbyToken: string) {
        this.lobbies.push( new Lobby(lobbyToken) );
    }

    join(lobbyToken: string, socketId: string) {
        const lobby = this.getLobbyByToken(lobbyToken);
        
        if (lobby) {
            lobby.socketIds.push(socketId);
        }

        console.log("join", this.lobbies.map(l => l.socketIds.join(", ")));
    }

    leave(socketId: string) {
        const lobby = this.getLobbyBySocket(socketId);

        if (lobby) {
            lobby.socketIds.splice(lobby.socketIds.indexOf(socketId), 1);
            
            if (!lobby.socketIds.length) {
                this.lobbies.splice(this.lobbies.indexOf(lobby), 1);
            }

            console.log("leave", this.lobbies.map(l => l.socketIds.join(", ")));
        }
    }

    broadcast(io: any, socketId: string, method: string, data: any) {
        const lobby = this.getLobbyBySocket(socketId) || new Lobby("");
        
        for (let socketId of lobby.socketIds) {
            io.to(socketId).emit(method, data);
        }
    }
}