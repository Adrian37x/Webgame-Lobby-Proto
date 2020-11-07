export class PageComponent {
    appendChildElements(childs: HTMLElement[], parent: HTMLElement = document.body) {
        for (let child of childs) {
            parent.appendChild(child);
        }
    }

    createElement(type: string, text: string = ""): HTMLElement {
        const element = document.createElement(type);
        element.innerText = text;

        return element;
    }

    createButtonElement(text: string, onClick?: any): HTMLElement {
        const button = this.createElement("button");
        button.innerText = text;
        button.onclick = onClick;

        return button;
    }

    createInputElement(type: string, placeholder: string = "", onKeyPress?: any) {
        const input = this.createElement("input") as HTMLInputElement;
        input.type = type;
        input.placeholder = placeholder;
        input.onkeypress = onKeyPress;

        return input;
    }
}