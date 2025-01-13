import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { ICidade } from '../../dataBase/models';
import { UpateByIdCidadesUseCase } from '../../useCases/cidades/UpdateById';


interface IParamsProps {
  id?: number;  
}

interface IBodyProps extends Omit<ICidade, 'id'> {}


export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
    
  }).noUnknown(true, "Campos adicionais não são permitidos")),
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  }).noUnknown(true, "Campos adicionais não são permitidos"))
   
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  try{
    
    const body : IBodyProps = {...req.body }
    const {id} = req.params
    const updateCidadeUseCase = new UpateByIdCidadesUseCase();
    const result = await updateCidadeUseCase.update( Number(id), body); 
    res.status(StatusCodes.OK).json({
      message: 'Alteração realizada com sucesso!'            
    })
        
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