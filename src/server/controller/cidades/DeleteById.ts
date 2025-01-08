import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { CidadesProvider } from '../../dataBase/providers/cidades';
import { validation } from '../../shared/middleware';
import DataNotFoundException from '../../../core/exceptions/DataNotFoundException';


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

    if(!id) {
      res.status(StatusCodes.BAD_REQUEST).json({
        errors:{
          default:'Informe o id do registro!'
        }
      });
    } 
  
    const result = await CidadesProvider.deleteById(Number(id))
  

    if (typeof result === 'number' && result < 1) {
      throw new DataNotFoundException('Registro não encontrado!');
    }
  
     res.status(StatusCodes.OK).json({
      message:'Registro excluido com sucesso!',
      statusCode: StatusCodes.OK
    });
    
  } catch (error:any) {

    const statusCode = error._httpCode
    const message = error.message
    console.error(error); 
    
    if (error instanceof Error) {
      return res.status(statusCode).json({
        message,
        statusCode
      })
    } 
 }
  
}