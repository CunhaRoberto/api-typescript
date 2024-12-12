import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { validation } from '../../shared/middleware';


interface IParamsProps {
  id?: number;  
}

interface IBodyProps {
  nome: string;  
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
    
  }).noUnknown(true, "Campos adicionais não são permitidos")),
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  }).noUnknown(true, "Campos adicionais não são permitidos"))
   
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
    console.log(req.params, req.body);
    if(req.params.id && req.params.id > 1000) {
      res.status(StatusCodes.NOT_FOUND).json({
        errors:{
          default:'Registro não encontrado!'
        }
    });

    } else{
      res.status(StatusCodes.OK).json({
        message:{
          default:'Dados atualizados Com sucesso!'
        }
      });
   
    }
};