import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, ORDER_SERVICE } from 'src/config';

@Module({
  imports : [
    ClientsModule.register([{
        name : ORDER_SERVICE,
        transport : Transport.TCP,
        options :{
          host : envs.ordersmicroserviceHost,
          port : envs.ordersmicroservicePort
        }
      }
    ])
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
