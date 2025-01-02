import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../dataBase/models';
import { CidadesProvider } from '../../dataBase/providers/cidades';



interface IBodyProps extends Omit<ICidade, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  }).noUnknown(true, "Campos adicionais não são permitidos"))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  console.log(req.body);
  
  const result = await CidadesProvider.create(req.body)
  


  if(result instanceof Error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result.message
      }
    })
  }

  res.status(StatusCodes.CREATED).json(result);
};
