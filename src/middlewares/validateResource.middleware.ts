import { Request, Response, NextFunction } from "express";
import {AnyZodObject} from "zod";

const validateResource = (schema : AnyZodObject) => (req:Request, res:Response, next:NextFunction) =>{
    try{
        schema.parse({
            body:req.body,
            params:req.params,
            query:req.query
        })
        next();
    }catch(err:any){
    
        return res.send({status:409,data:null,msg:"Bad request"})
    }
}

export default validateResource;