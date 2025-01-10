import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { validation } from '../../shared/middleware';
import { GetByIdCidadeUseCase  } from '../../useCases/cidades/GetById';


import * as yup from 'yup';

interface IParamsProps {
  id?: number;  
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
    
  }).noUnknown(true, "Campos adicionais não são permitidos"))
   
}));

export const getById = async (req: Request<IParamsProps>, res: Response) => {
try{

  const {id} = req.params    
  const getByIdCidadeUseCase = new GetByIdCidadeUseCase();
  const result = await getByIdCidadeUseCase.getById(Number(id)); 
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
  
}


    

    
