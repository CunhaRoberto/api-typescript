import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

import { validation } from '../../shared/middleware';


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
    console.log(req.query);
    res.setHeader('acess-control-exponse-headers', 'x-total-count')
    res.setHeader('x-total-count', 1)
    //res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Get all não implementado!');
    res.status(StatusCodes.OK).json([
      {
      id: 1,
      nome: "São José do rio Preto"
    }
  ]);
  console.log({
      id: 1,
      nome: "São José do rio Preto"
    }
 
  );
};