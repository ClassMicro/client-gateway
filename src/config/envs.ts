
import 'dotenv/config';
import * as joi from 'joi';


interface EnvVars{
    PORT : number;
    products_microservice_host : string
    products_microservice_port: number
    orders_microservice_host : string
    orders_microservice_port : number
    // DATABASE_URL : string;
}
// son los datos de entorno que vammos a validar y que se tienen que definir
// si no se definen lanzamos un error
const envschema = joi.object({
    PORT: joi.number().required() , 
    products_microservice_host : joi.string().required(),
    products_microservice_port : joi.number().required(),
    orders_microservice_host: joi.string().required(),
    orders_microservice_port: joi.number().required(),
    // DATABASE_URL : joi.string().required(),
}).unknown(true);

const {error , value  } = envschema.validate(process.env);

if (error) {
    throw new Error(`configuracion de validacion de entorno: ${error.message}`);
}

const envVars : EnvVars = value;


export const envs ={
    port : envVars.PORT,
    productsMicroserviceHost: envVars.products_microservice_host,
    productsMicroservicePort: envVars.products_microservice_port,
    ordersmicroserviceHost: envVars.orders_microservice_host,
    ordersmicroservicePort: envVars.orders_microservice_port
    // databaseUrl : envVars.DATABASE_URL,
}