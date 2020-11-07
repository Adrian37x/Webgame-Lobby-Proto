import { PageComponent } from "../page.component";
import { IComponent } from "../IComponent";
import { Router } from "../../router";

export class AppComponent extends PageComponent implements IComponent {
    constructor (
        private router: Router
    ) {
        super();
    }

    onRender() {
        this.appendChildElements([
            this.createElement("h1", "Lobby Hosting Proto"),
            this.createButtonElement("Host private lobby", () => {
                this.host();
            }),
        ]);
    }

    host() {
        this.router.navigate("lobby");
    }
}