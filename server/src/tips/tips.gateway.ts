import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Namespace, Socket } from 'socket.io';
import { Payment } from 'src/payments/payment.entity';
import { Swap } from 'src/swaps/swap.entity';

@WebSocketGateway({
  namespace: '/tips',
})
export class TipsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger(TipsGateway.name);

  @WebSocketServer()
  server: Namespace;

  async handleConnection(client: Socket) {
    const tipId = client.handshake.auth.tipId;
    this.logger.log(`Recovered: ${client.recovered}`);
    this.logger.log(`Client ${client.id} connected - TipId: ${tipId}`);

    client.emit('dummyEvent');
    await client.join(`tip-${tipId}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client ${client.id} disconnected`);
  }

  notifyTipPayment(tipId: number, payment: Payment) {
    return this.server.to(`tip-${tipId}`).emit('tip', payment);
  }

  notifySwapStatusChange(tipId: number, swap: Swap) {
    return this.server.to(`tip-${tipId}`).emit('swap-status-change', swap);
  }
}
