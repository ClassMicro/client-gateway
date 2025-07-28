import { ArrayMinSize, IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, ValidateNested } from "class-validator";
import { OrdersStatusList } from "../enum/orders.enum";
import { OrderStatus } from "../enum/status";
import { Type } from "class-transformer";
import { OrdersItemsDto } from "./orders-items.dto";

export class CreateOrderDto {
    // @IsNumber()
    // @IsPositive()
    // total : number;

    // @IsNumber() 
    // @IsPositive()
    // totalItems: number;

    // @IsEnum(OrdersStatusList,{
    //     message: `Status must be one of the following: ${OrdersStatusList}}`
    // })
    // @IsOptional()
    // status : OrderStatus = OrderStatus.PENDING;

    // @IsBoolean()
    // @IsOptional()
    // paid : boolean = false;


    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each: true})
    @Type(() => OrdersItemsDto)
    items : OrdersItemsDto[]
}
