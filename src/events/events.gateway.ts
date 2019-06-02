import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { BehaviorSubject } from 'rxjs';
import { Client, Server } from 'socket.io';

interface message {
  who: string;
  what: string;
}

@WebSocketGateway()
export class EventsGateway implements OnGatewayInit, OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  log$ = new BehaviorSubject(<message[]>[{who: "admin", what: "welcome"}]);

  @SubscribeMessage('speak')
  handleEvent(client: Client, data: message): void {
    // console.log(data);
    this.log$.next([...this.log$.value, data]);
   }

  afterInit(server){
    this.log$.asObservable().subscribe(val => {
    // console.log("emitting", val);
    server.emit('speak', val);
    });
  };

  handleConnection(server){
    // console.log("sending to connection: ", this.log$.getValue());
    server.emit('speak', this.log$.getValue());
  }
}
