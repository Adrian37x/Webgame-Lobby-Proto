import { PageComponent } from "../page.component";
import { IComponent } from "../IComponent";
import { Router } from "../../router";
import { SocketService } from "../../services/socket.serivice";

export class LobbyComponent extends PageComponent implements IComponent {
    lobbyToken;
    chatElement;

    constructor (
        private router: Router,
        private socketService: SocketService
    ) {
        super();
    }

    onRender() {
        this.lobbyToken = this.router.readParam("token");

        if (this.lobbyToken) {
            this.socketService.emit("join", this.lobbyToken);
        }

        this.chatElement = this.createElement("chat");

        this.appendChildElements([
            this.createElement("h1", `Lobby ${this.lobbyToken}`),
            this.chatElement,
            this.createInputElement("text", "message", (e) => { this.checkMessageInput(e) })
        ]);

        this.socketService.listen("message").subscribe(message => {

            this.appendChildElements([
                this.createElement("message", message + "")
            ], this.chatElement);
        });
    }

    checkMessageInput(event) {
        if (event.key == "Enter") {
            this.socketService.emit("message", {room: this.lobbyToken, message: event.target.value});
            event.target.value = "";
        }
    }
}