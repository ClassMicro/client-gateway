import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { NatsModule } from 'src/transports/nats.module';
// import { envs, ORDER_SERVICE } from 'src/config';

@Module({
  imports : [
    NatsModule
    // ClientsModule.register([
    //   {
    //     name : NATS_SERVICE,
    //     transport : Transport.NATS,
    //     options :{
    //       // host : envs.ordersmicroserviceHost,
    //       // port : envs.ordersmicroservicePort
    //     }
    //   }
    // ])
  ],
  controllers: [OrdersController],
  providers: [],
})
export class OrdersModule {}
