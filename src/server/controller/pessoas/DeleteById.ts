import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { DeletePessoaUseCase } from '../../useCases/pessoas/DeleteById';



interface IParamsProps {
  id?: number;  
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
    
  }).noUnknown(true, "Campos adicionais não são permitidos"))
   
}));

export const deleteById = async (req: Request<IParamsProps>, res: Response) => { 
  try{

    const {id} = req.params   
  
    const deletePessoaUseCase = new DeletePessoaUseCase();
    await deletePessoaUseCase.delete(Number(id)); 

    res.status(StatusCodes.OK).json({
      message:'Registro excluido com sucesso!',
      statusCode: StatusCodes.OK
    });
    
    
    
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