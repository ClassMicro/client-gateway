import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports :[NatsModule],
  // definimos nuestro microservicio y lo enrutamos asi el controlador de peticiones de productos
  // se conecta a este microservicio
  // imports:[ ClientsModule.register([{

  //   // creamos la constante PRODUCT_SERVICE que es la clave de nuestro microservicio
  //   name : NATS_SERVICE,
  //   transport: Transport.NATS,
  //   options :{
  //       // host : envs.productsMicroserviceHost,
  //       // port : envs.productsMicroservicePort,
  //       servers : envs.NATS_SERVERS    }
  // }])],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
