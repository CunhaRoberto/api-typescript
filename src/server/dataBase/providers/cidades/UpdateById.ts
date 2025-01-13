import {Knex} from "../../knex";
import { ETableNames } from "../../ETableNames";
import InternalServerErrorException from "../../../../core/exceptions/InternalServerErrorException";
import { ICidade } from "../../models";

export const update = async (id: number, cidade: Omit<ICidade, 'id'>): Promise< number > => {
    try {
      const result = await Knex(ETableNames.cidade)
      .update(cidade)
      .where('id', '=', id)
  
      return result
      
    } catch (error) {
      console.error(error);      
      throw new InternalServerErrorException('Erro ao inesperado ao excluir o registro. Por favor, tente novamente mais tarde.');
    }
  };
  
