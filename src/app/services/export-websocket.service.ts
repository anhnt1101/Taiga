import { inject, Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

import { AuthService } from './auth.service';
import { ExportNotification } from '../models/export.model';

@Injectable({
  providedIn: 'root',
})
export class ExportWebSocketService {
  private readonly authService = inject(AuthService);

  private readonly brokerUrl = 'ws://localhost:8080/ws';
  private readonly queue = '/user/queue/exports';
  private client: Client | null = null;

  private readonly messageSubject = new Subject<ExportNotification>();

  readonly messages$: Observable<ExportNotification> = this.messageSubject.asObservable();

  connect(): void {
    if (this.client) {
      return;
    }
    const client = new Client({
      brokerURL: this.brokerUrl,
      reconnectDelay: 5000,
      onConnect: () => {
        client.subscribe(this.queue, (message) => {
          this.handleMessage(message);
        });
        console.log('[WEBSOCKET] CONNECTED');
      },
      onDisconnect: () => {
        console.log('[WEBSOCKET] DISCONNECTED');
      },
      onStompError: (frame) => {
        console.error('[WEBSOCKET] STOMP ERROR', frame.body);
      },
    });

    client.beforeConnect = async () => {
      const token = this.authService.getToken();
      if (!token) {
        throw new Error('Không có JWT token');
      }
      client.connectHeaders = {
        Authorization: `Bearer ${token}`,
      };
    };
    this.client = client;
    client.activate();
  }

  disconnect(): void {
    const client = this.client;

    this.client = null;

    if (client) {
      void client.deactivate();
    }
  }

  private handleMessage(message: IMessage): void {
    try {
      const data = JSON.parse(message.body) as ExportNotification;
      console.log('[WEBSOCKET] MESSAGE', data);
      this.messageSubject.next(data);
    } catch (error) {
      console.error('[WEBSOCKET] INVALID MESSAGE', message.body, error);
    }
  }
}
