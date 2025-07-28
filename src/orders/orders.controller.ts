import { Controller, Get, Post, Body, Param, Inject, ParseUUIDPipe, Query, Patch } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ORDER_SERVICE } from 'src/config';
import { catchError } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersPaginationDto } from './dto/ordersd-pagination.dto';
import { StatusDto } from './dto/status.dto';
import { PaginationDto } from 'src/common';

@Controller('orders')
export class OrdersController {
  constructor(@Inject(ORDER_SERVICE) private readonly ordersClient : ClientProxy) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto).pipe(
      catchError((error)=>{throw new RpcException(error)})
    )
  }

  @Get()
  findAll(@Query() orderspaginationDto: OrdersPaginationDto) {
    return this.ordersClient.send('findAllOrders', orderspaginationDto).pipe(
          catchError((error) => { throw new RpcException(error) })
        );
  }
 

  @Get('id/:id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersClient.send('findOneOrder', { id }).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }
@Get(':status')
  findAllStatus(@Param('status')status : StatusDto , @Query() paginationDto: PaginationDto) {
    return this.ordersClient.send('findAllOrders', { status , ...paginationDto }).pipe(
      catchError((error) => { throw new RpcException(error) })
    );
  }
 @Patch(':id')
 changeStatus(@Param('id' , ParseUUIDPipe) id: string, @Body() status: StatusDto) {
   return this.ordersClient.send('changeOrdersStatus', { id, status : status.status }).pipe(
    catchError((error) => { throw new RpcException(error) })
  );
 }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   //return this.ordersService.remove(+id);
  // }
}
