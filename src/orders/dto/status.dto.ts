import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { OrderStatus } from '../enum/status';
import { OrdersStatusList } from '../enum/orders.enum';

export class StatusDto{

    @IsOptional()
    @IsEnum(OrdersStatusList ,{
        message : `el estado debe ser uno de los siguientes : ${OrdersStatusList}`
    })
    status : OrderStatus;
}