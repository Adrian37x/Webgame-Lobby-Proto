import io from "socket.io-client";
import { Observable } from "rxjs";

export class SocketService {
    private socket: any;

    constructor() {
        this.socket = io(location.origin);
    }

    listen(eventName: string) {
        return new Observable((subscriber) => {
            this.socket.on(eventName, (data) => {
                subscriber.next(data);
            });
        });
    }

    emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }
}