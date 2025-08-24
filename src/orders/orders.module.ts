import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
// import { envs, ORDER_SERVICE } from 'src/config';

@Module({
  imports : [
    ClientsModule.register([
      {
        name : NATS_SERVICE,
        transport : Transport.NATS,
        options :{
          // host : envs.ordersmicroserviceHost,
          // port : envs.ordersmicroservicePort
        }
      }
    ])
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
