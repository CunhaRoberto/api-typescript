import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middleware';
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../dataBase/models';
import { PessoasProvider } from '../../dataBase/providers/pessoas';
import { CreatePessoaUseCase } from '../../useCases/pessoas/Create';



interface IBodyProps extends Omit<IPessoa, 'id'> {}

export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
    nomeCompleto: yup.string().required().min(3),
  }).noUnknown(true, "Campos adicionais não são permitidos"))
}));


export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  try{
  
    const params: IBodyProps = {...req.body }
    const createPessoaUseCase = new CreatePessoaUseCase();
    const result = await createPessoaUseCase.create(params); 
    res.status(StatusCodes.OK).json({
      message: 'Pessoa cadastrada com sucesso!',
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
