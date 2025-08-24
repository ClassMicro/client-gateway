import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    // injectar nuestro servicio de productos para poder consumirlo
    @Inject(NATS_SERVICE) private readonly productsClient : ClientProxy
  ) {}




  @Post()
   createProduct(){
    return 'crear un producto!';
   }
  @Get()
  // este metodo recibe la paginacion como parametro
  // y lo envia al microservicio de productos tenga en cuenta enviarlo no envuelto sino directamente
  getProducts(@Query() paginationDto : PaginationDto) {
   return this.productsClient.send({cmd : 'findAllProducts'}, paginationDto);
  }

  @Get(':id')
   async getProductById(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.productsClient.send({cmd : 'findOneProduct'}, {id})
      );
      return product;
      } catch (error) {
        throw new RpcException(error)
      }
    }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return `eliminar producto por id: ${id}`;
  }
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() body: any) {
    return `actualizar producto por id: ${id}`;
  }

}
