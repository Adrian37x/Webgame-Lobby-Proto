import { AppComponent } from "./components/app/app.component";
import { LobbyComponent } from "./components/lobby/lobby.component";
import { SocketService } from "./services/socket.serivice";

export class Router {
    readonly routes = [
        { path: "", component: new AppComponent(this) },
        { path: "/lobby/:token", component: new LobbyComponent(this, new SocketService()) }
    ];

    activeRoute;

    constructor() {
        this.navigate();
    }

    private getRoute(url: string) {
        const urlParts = this.getPathParts(url);

        for (let route of this.routes) {
            const parts = this.getPathParts(route.path);

            if (parts.length == urlParts.length) {
                let isNoMatch = false;
                
                for (let i = 0; i < parts.length; i++) {
                    isNoMatch = parts[i] != urlParts[i] && !parts[i].includes(":");
                }

                if (!isNoMatch) {
                    return route;
                }
            }
        }
    }

    private getPathParts(path: string): string[] {
        return path.split("/").filter(s => s);
    }

    navigate(url: string = location.pathname) {
        if (location.pathname != url) {
            location.pathname = url;
            return;
        }

        const route = this.getRoute(url);

        if (route) {
            this.activeRoute = route;
            document.body.innerHTML = "";
            route.component.onRender();
        } else {
            location.pathname = "";
        }
    }

    readParam(name: string): string {
        const activeRouteParts = this.getPathParts(this.activeRoute.path);
        const locationParts = this.getPathParts(location.pathname);

        for (let i = 0; i < activeRouteParts.length; i++) {
            if (activeRouteParts[i].includes(":") && activeRouteParts[i].split(":").join("") == name) {
                return locationParts[i];
            }
        }

        return "";
    }
}