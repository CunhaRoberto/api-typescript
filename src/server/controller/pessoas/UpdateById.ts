import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import * as yup from 'yup';
import { validation } from '../../shared/middleware';
import { IPessoa } from '../../dataBase/models';
import { PessoasUseCases } from '../../useCases/pessoas'
import { UpateByIdPessoasUseCase } from '../../useCases/pessoas/UpdateById';


interface IParamsProps {
  id?: number;  
}

interface IBodyProps extends Omit<IPessoa, 'id'> {}


export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamsProps>(yup.object().shape({
    id: yup.number().integer().required().moreThan(0)
    
  }).noUnknown(true, "Campos adicionais não são permitidos")),
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email().lowercase(),
        cidadeId: yup.number().integer().required(),
        nomeCompleto: yup.string().required().min(3),
  }).noUnknown(true, "Campos adicionais não são permitidos"))
   
}));

export const updateById = async (req: Request<IParamsProps, {}, IBodyProps>, res: Response) => {
  try{
    
    const body : IBodyProps = {...req.body }
    const {id} = req.params
    const updatePessoaUseCase = new UpateByIdPessoasUseCase();
    const result = await updatePessoaUseCase.update( Number(id), body); 
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