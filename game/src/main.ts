import { SocketService } from "./services/socket.serivice";

class Main {
    // element references
    chat: HTMLElement;
    messageInput: HTMLElement;

    constructor(
        private socketService: SocketService
    ) {
        this.chat = document.querySelector("chat") || document.createElement("chat");
        this.messageInput = document.querySelector("input") || document.createElement("input");
        this.messageInput.addEventListener("keypress", (e) => { this.checkMessageInput(e) });

        const lobbyToken = location.pathname.split("/").filter(s => s).pop();
        if (lobbyToken) {
            socketService.emit("join", lobbyToken);
        }

        this.socketService.listen("message").subscribe(message => {
            const messageElement = document.createElement("message");
            messageElement.innerText = message + "";
            this.chat.appendChild(messageElement);
        });
    }

    checkMessageInput(event) {
        if (event.key == "Enter") {
            const lobbyToken = location.pathname.split("/").filter(s => s).pop();

            this.socketService.emit("message", {room: lobbyToken, message: event.target.value});
            event.target.value = "";
        }
    }
}

onload = () => {
    new Main(
        new SocketService()
    );
}