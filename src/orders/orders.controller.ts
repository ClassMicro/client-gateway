import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersPaginationDto } from './dto/ordersd-pagination.dto';
import { StatusDto } from './dto/status.dto';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(NATS_SERVICE) private readonly ordersClient : ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return this.ordersClient.send('createOrder', createOrderDto).pipe(
        catchError((error) => { throw new RpcException(error) })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  findAll(@Query() orderspaginationDto: OrdersPaginationDto) {
    try {
      return this.ordersClient.send('findAllOrders', orderspaginationDto).pipe(
        catchError((error) => { throw new RpcException(error) })
      );
      
    } catch (error) {
      throw new RpcException(error);
    }
  }
 

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    try {
      return this.ordersClient.send('findOneOrder', { id }).pipe(
        catchError((error) => { throw new RpcException(error) })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
@Get(':status')
  findAllStatus(@Param('status')status : StatusDto , @Query() paginationDto: PaginationDto) {
    try {
      return this.ordersClient.send('findAllOrders', { status , ...paginationDto }).pipe(
        catchError((error) => { throw new RpcException(error) })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
 @Patch(':id')
 changeStatus(@Param('id' , ParseUUIDPipe) id: string, @Body() status: StatusDto) {
   try {
     return this.ordersClient.send('changeOrdersStatus', { id, status : status.status }).pipe(
       catchError((error) => { throw new RpcException(error) })
     );
   } catch (error) {
     throw new RpcException(error);
   }
 }
}
