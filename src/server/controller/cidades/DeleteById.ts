import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { CidadesProvider } from '../../dataBase/providers/cidades';
import { validation } from '../../shared/middleware';


interface IParamsProps {
  id?: number;  
}

export const deleteByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
    
  }).noUnknown(true, "Campos adicionais não são permitidos"))
   
}));

export const deleteById = async (req: Request<IParamsProps>, res: Response) => { 
  
  const {id} = req.params

  if(!id) {
    res.status(StatusCodes.BAD_REQUEST).json({
      errors:{
        default:'Informe o id do registro!'
      }
    });
  } 

  const result = await CidadesProvider.deleteById(Number(id))

  if(result instanceof Error){
    console.log(result.message)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result  
      }
    });
  }

    res.status(StatusCodes.OK).json('Registro excluido com sucesso!');
    
}