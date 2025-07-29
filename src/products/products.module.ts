import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCT_SERVICE } from 'src/config';

@Module({
  // definimos nuestro microservicio y lo enrutamos asi el controlador de peticiones de productos
  // se conecta a este microservicio
  imports:[ ClientsModule.register([{

    // creamos la constante PRODUCT_SERVICE que es la clave de nuestro microservicio
    name : PRODUCT_SERVICE,
    transport: Transport.TCP,
    options :{
        host : envs.productsMicroserviceHost,
        port : envs.productsMicroservicePort,
    }
  }])],
  controllers: [ProductsController],
  providers: [],
})
export class ProductsModule {}
