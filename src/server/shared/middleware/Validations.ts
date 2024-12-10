import{Schema, ValidationError} from "yup"
import { RequestHandler } from "express"
import { StatusCodes } from "http-status-codes"

type TValidation = (field: 'body' | 'header' | 'params'| 'query', schema: Schema<any>) => RequestHandler

export const validation : TValidation = (field, schema) => async(req, res, next) =>{
        console.log("executando a validação")  
        try {
            await schema.validate(req[field], {abortEarly: false, stripUnknown: false});
            next(); 
          } catch (err) {
            const yupError = err as ValidationError;
            const errors: Record<string, string> = {};
        
            yupError.inner.forEach((error) => {
              if (error.path !== undefined) {
                errors[error.path] = error.message;
              }
            });
        
            res.status(StatusCodes.BAD_REQUEST).json({ errors });
          }   
}