import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";
import InternalServerErrorException from "../../../../core/exceptions/InternalServerErrorException";
import { IPessoa } from "../../models";

export const update = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise< number > => {
    try {
      const result = await Knex(ETableNames.pessoa)
      .update(pessoa)
      .where('id', '=', id)
  
      return result
      
    } catch (error) {
      console.error(error);      
      throw new InternalServerErrorException('Erro ao inesperado ao excluir o registro. Por favor, tente novamente mais tarde.');
    }
  };
  
