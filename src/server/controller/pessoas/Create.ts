import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../dataBase/models';
import { PessoasProvider } from '../../dataBase/providers/pessoas';



interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
    nomeCompleto: yup.string().required().min(3),
  }).noUnknown(true, "Campos adicionais não são permitidos"))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await PessoasProvider.create(req.body)

  if(result instanceof Error){
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default: result.message
      }
    })
  }

  res.status(StatusCodes.CREATED).json(`Cadastrado com sucesso! id: ${ result}`);
};
