import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { ICidade } from '../../dataBase/models';
import { CreateCidadeUseCase } from '../../useCases/cidades/Create';



interface IBodyProps extends Omit<ICidade, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
  }).noUnknown(true, "Campos adicionais não são permitidos"))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  try{
  
    const params: IBodyProps = {...req.body }
    const createPessoaUseCase = new CreateCidadeUseCase();
    const result = await createPessoaUseCase.create(params); 
    res.status(StatusCodes.CREATED).json({
      message: 'Cidade cadastrada com sucesso!',
      id: result
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
};
