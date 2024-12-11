import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';

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
    console.log(req.params);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Delete não implementado!');
};