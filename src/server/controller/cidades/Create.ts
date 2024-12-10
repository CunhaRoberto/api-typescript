import { validation } from './../../shared/middleware';
import { Request, RequestHandler, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";

interface ICidade {
  nome: string;
  estado: string;
}

const bodyValidation: yup.Schema<ICidade> = yup
  .object()
  .shape({
    nome: yup.string().required().min(5),
    estado: yup.string().required().min(2).max(2),
  })
  .noUnknown(true, "Campos adicionais não são permitidos");

  interface IFilter {
    filter: string
    
  }
  const queryValidation: yup.Schema<IFilter> = yup
  .object()
  .shape({
    filter: yup.string().required().min(3),
    
  })
  .noUnknown(true, "Campos adicionais não são permitidos");



export const createBodyValidation = validation('body',bodyValidation)
export const createQueryValidation = validation('query',queryValidation)

export const create = async ( req: Request<{}, {}, ICidade>,  res: Response) => {
  console.log(req.body);
  res.status(StatusCodes.CREATED).send("Created!!");
};
