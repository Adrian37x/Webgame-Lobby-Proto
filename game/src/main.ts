import { Router } from "./router";

class Main {
    constructor(
        private router: Router
    ) {}
}

onload = () => {
    new Main(
        new Router()
    );
}