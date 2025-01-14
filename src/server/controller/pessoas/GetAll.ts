import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { GetAllPessoasUseCase } from '../../useCases/pessoas/GetAll';


interface IQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
}

export const getAllValidation = validation((getSchema) => ({
  query: getSchema<IQueryProps>(yup.object().shape({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional()
  }).noUnknown(true, "Campos adicionais não são permitidos"))
   
}));

export const getAll = async (req: Request<{}, {}, {}, IQueryProps>, res: Response) => {
 try{
 
   const params : IQueryProps  = req.query    
   const getAllPessoaUseCase = new GetAllPessoasUseCase();
   const result = await getAllPessoaUseCase.getAll(params); 
   res.status(StatusCodes.OK).json( result);   
     
     
   } catch (error:any) {
 
     const statusCode = error._httpCode
     const message = error.message
     console.error(error); 
     
     if (error instanceof Error) {
       res.status(statusCode).json({
         message,
         statusCode
       })
     } 
     return 
  }
      
};