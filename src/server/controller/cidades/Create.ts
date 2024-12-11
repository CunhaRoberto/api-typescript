import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';


interface IBodyProps {
  nome: string;  
}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  }).noUnknown(true, "Campos adicionais não são permitidos"))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  console.log(req.body);
  //res.status(StatusCodes.CREATED).send('Create não implementado!');
  res.status(StatusCodes.CREATED).json(1);
};
